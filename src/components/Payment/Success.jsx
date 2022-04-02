import React, { useState, useMemo, useEffect } from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getSessionDetail, getPurchaseHistory } from '../../api';

// custom hook with pre-requisite of URLSearchParams & useMemo & useLocation
// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams 
const useQuery = () => {
    const { search } = useLocation(); // return key-value pairs of query
  
    return useMemo(() => new URLSearchParams(search), [search]); 
    // memo each query
  }

const Success = () => {
    const [isLoading, setIsLoading] = useState(true)

    let query = useQuery();
    const id = query.get("session_id")  // URLSearchParams.get(key) return value
    console.log(id);
    const LoadData = async(id) => {
        const storedData = JSON.parse(localStorage.getItem("profile"))
        const { user_id } = storedData;
        try {
            const res = await getSessionDetail(id)
            if(res){
                console.log("Payment successful, retrieved session data:");
                console.log(res);
                // Update Redis Cache
                const update = await getPurchaseHistory(res.data.session.customer, user_id) 
                if(update) console.log("Updated cache",update);
                setIsLoading(false)
            }
                        
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if(id) LoadData(id)
    },[id])



    return ( isLoading ? 
        <div className="loader"/>
        :
        <div className="d-flex justify-content-center">
            <div className="mt-5">
                <h1>
                    Payment Successful!
                    
                </h1>
                <p>
                    <Link to="/dashboard">
                        Go To Dashboard
                    </Link>
                </p>
            </div>

        </div>
    )
}

export default Success

