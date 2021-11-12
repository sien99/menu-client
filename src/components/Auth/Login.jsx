import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Login = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button className="login-button" variant="light" onClick={handleShow}>
          Login/Sign Up
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="login-header" closeButton>
            <Modal.Title style={{margin:"auto"}}>Log In / Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        </Modal>
      </>
    );
}

export default Login
