import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import Login from './Login';
import Signup from './Signup';

const Auth = () => {
    const [show, setShow] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const handleShow = () => setShow(true);

    // children setShow(false)
    const onClose = () => setShow(false)
    const onCloseSignUp = () => setShowSignUp(false)
    const onToggle = () => {
        setShowSignUp(prev=>!prev)
        setShow(prev=>!prev)
    }

    return (
        <>
        <Button className="login-button" variant="light" onClick={handleShow}>
              Login/Sign Up
        </Button>
        <Login 
            show={show}
            handleClose={onClose}
            onToggle={onToggle}
        />
        <Signup 
            show={showSignUp}
            onToggle={onToggle}
            handleClose={onCloseSignUp}
        />
        </>
    )
}

export default Auth
