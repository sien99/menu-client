import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import Login from './Login';
import Signup from './Signup';
import { getUser } from '../../api';

const Auth = () => {
    const [show, setShow] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState('');
    
    const logout = () => {
        localStorage.removeItem("profile");
        window.location = '/'
    }

    useEffect(() => {
        const initData = async() => {
            if(localStorage.getItem("profile")){
                setIsLoading(true)
                await getUser()
                .then((res) => {
                    console.log(res);
                    if(res.data.success){
                        setData(JSON.parse(localStorage.getItem("profile")))
                        setIsLoggedIn(true)
                        setIsLoading(false)                        
                    };
                })
            }
        }
        initData()
    }, [])

    console.log(data);

    const handleShow = async() => {
        // case: not LoggedIn
        if (!isLoggedIn) setShow(true);
        // case: Logged In
        else {
            await getUser()
                .then((res) => {
                    console.log(res.data);
                }).catch(err=>{
                    console.log(err.response.data);
                    alert(`Error: ${err.response.data.msg}, please login again!`)
                    logout()
                    window.location = "/"
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
    const onLoggedIn = (data) => {
        setIsLoggedIn(true)
        onClose() //only need onClose coz Signup will not active during Login
        setData(data)
        localStorage.setItem("profile", JSON.stringify(data))
    }
    
    // must add ? else will crash
    const username = data.user?.username.split('@')[0]

    return (
        <>
        <Button className="login-button" variant="light" onClick={handleShow}>
             { (!isLoggedIn && isLoading) ? "Loading..." : '' }
             {(isLoggedIn)? `Hi, ${username}` : !isLoading && "Login/Sign Up"} 
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
        <Button className="login-button" 
            style={{marginLeft:"15px",display: isLoggedIn? '':"none"}}
            variant="light" onClick={logout}
        >
            Logout
        </Button>
        </>

    )
}

export default Auth
