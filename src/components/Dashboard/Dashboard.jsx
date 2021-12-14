import React, { useEffect, useState } from 'react';
import { getPurchaseHistory, getUser } from '../../api';
import { useNavigate } from 'react-router';
import PurchasedOrder from './PurchasedOrder';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [lineItems, setLineItems] = useState([])
    const [receiptUrls, setReceiptUrls] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        // when localStorage have data but state data empty due to reload
        const redirect = (error) => {
            alert(`You are authorized to view this page, you will be redirected to home. Error message: ${error}`)
            navigate("/main")
        }

        const initData = async() => {
            if(localStorage.getItem("profile")){
                setIsLoading(true)
                const storedData = JSON.parse(localStorage.getItem("profile"))
                const { customer_id, user_id } = storedData
                // check token 
                await getUser(user_id)
                .then((res) => {
                    console.log(res);
                    if(res.data.success){
                        // updateUserData(storedData)
                        getPurchaseHistory(customer_id)
                            .then((res)=>{
                                setLineItems(res.data.lineItems);
                                setReceiptUrls(res.data.receiptUrls);
                                console.log(res.data);
                            })
                            .then(()=>{
                             setIsLoggedIn(true)
                             setIsLoading(false)                                
                            })                     
                        
                    };
                })
                .catch((err)=>{
                    console.error(err.response.data);
                    // if token expired, clear user localStorage
                    redirect(err)
                })
            }else{
                redirect("User profile not found.")
            }
        }


        initData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        
        <div>
            { isLoading ?
                <div className="loader"/>
            :   
                isLoggedIn &&
                <>
                    {                 
                        lineItems.map((orderArr,idx) => (                           
                            <PurchasedOrder
                                key={orderArr[0].created}
                                orderData={orderArr}
                                receipt={receiptUrls[idx]}

                            />
                        ))
                    }
                </>
            }
        </div>
    )
}

export default Dashboard
