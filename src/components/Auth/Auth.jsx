import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Login from './Login';
import Signup from './Signup';
import { createCustomer, getUser, updateUser } from '../../api';
import { useNavigate } from 'react-router';


const Auth = () => {
    const [show, setShow] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [data, setData] = useState('');
    
    const logout = () => {
        localStorage.removeItem("profile");
        window.location = '/'
    }

    useEffect(() => {
        // when localStorage have data but state data empty due to reload
        const initData = async() => {
            if(localStorage.getItem("profile")){
                setIsLoading(true)
                const storedData = JSON.parse(localStorage.getItem("profile"))
                
                // check token 
                await getUser(storedData.user_id)
                .then((res) => {
                    console.log(res);
                    if(res.data.success){
                        setData(storedData)
                        // updateUserData(storedData)
                        setIsLoggedIn(true)
                        setIsLoading(false)                        
                    };
                })
                .catch((err)=>{
                    console.error(err.response.data);
                    // if token expired, clear user localStorage
                    logout()
                    setIsLoading(false)
                })
            }
        }

        initData()
    }, [])

    const navigate = useNavigate()

    const handleClick = async() => {
        // case: not LoggedIn
        if (!isLoggedIn) setShow(true);

        // case: Logged In
        else {
            await getUser(data.user_id)
                .then((res) => {
                    console.log(res.data);
                    navigate('/dashboard');
                }).catch(err=>{
                    console.log(err.response.data);
                    alert(`Error: ${err.response.data.msg}, please login again!`)
                    logout() // logout and redir to home
                })
        }

    }

    // children setShow(false)
    const onClose = () => setShow(false)
    const onCloseSignUp = () => setShowSignUp(false)
    const onToggle = () => {
        setShowSignUp(prev=>!prev)
        setShow(prev=>!prev)
    }

    const onLoggedIn = async(loginData) => {
        localStorage.setItem("profile", JSON.stringify({
            token: loginData.token,
        }))
        setIsLoggedIn(true)
        onClose() //only need onClose coz Signup will not active during Login
        console.log(loginData);
        let { customer_id } = loginData.user
        const { username, _id } = loginData.user
        // if cus_id is null or not exist
        if(!(customer_id)){
            // set email = username
            await createCustomer(_id)
            .then(async(res) => {
                customer_id = res.data.customer.id
                console.log("Customer id successfully initiated.",res)
                const payload = {
                    user_id: _id,
                    customer_id: customer_id,
                }
                await updateUser(payload)
                    .then((res)=>{
                        console.log("Successfully updated user cus_id.",res)
                    })
                    .catch((err)=>{
                        console.error("Failed to update user cus_id.",err);
                    })
                
            })
            .catch((err) => {
                console.error(err);
            })
        }

        const dataToStore = {
            token: loginData.token,
            username: username,
            user_id: _id,
            customer_id: customer_id,
        }

        localStorage.setItem("profile", JSON.stringify(dataToStore))
        
        setData(dataToStore)
    }
    
    const onHover = () => {
        setIsHover(prev=>!prev)
    }

    // must add ? else will crash
    const username = data.username?.split('@')[0]

    return (
        <>
        <Button 
            className="login-button"
            variant="light" 
            onClick={handleClick}
            onMouseOver={onHover} onMouseOut={onHover} 
        >
             { (!isLoggedIn && isLoading) ? "Loading..." : '' }
             {(isLoggedIn)? (!isHover && `Hi, ${username}`) : !isLoading && "Login/Sign Up"} 
             {isHover && isLoggedIn && "Dashboard"}
        </Button>
        <Login 
            show={show}
            handleClose={onClose}
            onToggle={onToggle}
            onLoggedIn={onLoggedIn}
        />
        <Signup 
            show={showSignUp}
            onToggle={onToggle}
            handleClose={onCloseSignUp}
        />
        <Button 
            style={{marginLeft:"15px",display: isLoggedIn? '':"none"}}
            variant="danger" onClick={logout}
        >
            Logout
        </Button>
        </>

    )
}

export default Auth
