import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="mt-5">
                <h1>Payment Cancelled</h1>
            </div>
            <p>
                <Link to="/main">
                    Back to Home
                </Link>    
            </p>

        </div>
    )
}

export default Cancel
