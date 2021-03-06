import React, { useRef, useState } from 'react'
import { Modal, Form, Button, Alert, Card } from 'react-bootstrap'
// import { useAuth } from '../contexts/AuthContext'
// import { useHistory } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { signUp } from '../../api';

const Signup = ({ show, handleClose, onToggle }) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    // const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    // const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation check
        if (passwordRef.current.value !== 
        passwordConfirmRef.current.value){
            return setError('Passwords do not match! Please enter correct confirmation password')
        }

        if (passwordRef.current.value.length < 6) {
            return setError('Password must be at least 6 characters.')
        }

        try {
          setError('')
          setLoading(true) //to prevent user accidentally click multi times
        
          const formData = {
            email: emailRef.current.value,
            password: passwordRef.current.value
          }
          // Axios Api
          await signUp(formData)
          .then(function (response) {
            console.log(response);
            // const { data, headers, status } = response
            // console.log(data,headers,status);
            if (response.data.success) {
                setError(false)
                setSuccess("Successfully register an account!")
            } 
          })
          .catch(function(error) {
            const { data } = error.response
            console.log(error.response);
            setError(data.msg)
          });
          
          
        } catch (error) {
            setError("Failed to create an account.")
        }
        setLoading(false)
    }

    const toggleLogin = () => {
        setSuccess(false)
        setError(false)
        setShowPassword(false)
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
                            <Form.Control 
                                type={showPassword?"text":"password"}  
                                ref={passwordRef} required 
                            />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            {/* ref for POST value */}
                            <Form.Control 
                                type={showPassword?"text":"password"}  
                                ref={passwordConfirmRef} required 
                            />
                            <Form.Check 
                                className="mt-2"
                                type="checkbox"
                                id="show-password"
                                label={`Show Password`}
                                onClick={()=>setShowPassword(!showPassword)}
                            />
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