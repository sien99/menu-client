import React, { useRef, useState } from 'react'
import { Modal, Form, Button, Alert, Card } from 'react-bootstrap'
// import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const Signup = ({ show, handleClose, onToggle }) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    // const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(history);
        // validation check
        if (passwordRef.current.value !== 
        passwordConfirmRef.current.value){
            return setError('Passwords do not match! Please enter correct confirmation password')
        }

        try {
          setError('')
          setLoading(true) //to prevent user accidentally click multi times
          console.log(emailRef.current.value, passwordRef.current.value);
        //   await signup(emailRef.current.value, passwordRef.current.value)  
          setSuccess("Successfully register an account!")
        } catch (error) {
            setError("Failed to create an account.")
        }
        setLoading(false)
    }

    const toggleLogin = () => {
        setSuccess(false)
        onToggle()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="login-header">
                <Modal.Title>
                    <AccessibilityNewIcon 
                        style={{ fontSize:"5rem", marginTop:"15px"}} 
                    />
                </Modal.Title> 
                <Button variant="outline-dark" className="auth-closeButton" 
                     onClick={()=>handleClose()}
                >            
                    <CloseIcon />
                </Button>
            </Modal.Header>
            <Modal.Body style={{ padding: "2rem", paddingTop: "0"}}>
                <Card style={{ margin: "auto", maxWidth: "60%"}}>
                    <Card.Body>    
                    <h2 className="text-center mb-4 mt-3">Sign Up</h2>
                    {/* {currentUser.email} */}
                    {
                        success && 
                        <Alert variant="success">{success}{"  "} 
                        <a href="#login" onClick={toggleLogin}>Login</a>
                        </Alert>
                    }
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            {/* ref for POST value */}
                            <Form.Control type="email" 
                            ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            {/* ref for POST value */}
                            <Form.Control type="password" 
                            ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            {/* ref for POST value */}
                            <Form.Control type="password" 
                            ref={passwordConfirmRef} required />
        
                        </Form.Group>
                        <Button disabled={loading} className="w-100 text-center mt-3" style={{height:"50px"}} type="submit">
                        Sign Up
                        </Button>
                    </Form>
                    </Card.Body>
                </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? 
                        <a href="#login" onClick={toggleLogin}>Login</a>
                    </div>  
            </Modal.Body>

        </Modal>
    )
}

export default Signup