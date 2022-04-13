import React, { useState, useRef } from "react";
import { Button, Modal, Card, Alert, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import { signIn } from "../../api";


const Login = ({ show, handleClose, onToggle, onLoggedIn }) => {

  // axios.post('/user', {
  //   firstName: 'Fred',
  //   lastName: 'Flintstone'
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  const emailRef = useRef();
  const passwordRef = useRef();
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true); //to prevent user accidentally click multi times

      const formData = {
        email: emailRef.current.value,
        password: passwordRef.current.value
      }
      // Axios Api
      await signIn(formData)
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          setError(false)
          onLoggedIn(response.data) //pass data to Auth
        } 
      })
      .catch(function (error) {
        setError("Invalid credentials.");
        setLoading(false);
        console.log(error);
      });
      setLoading(false); //re-enable button
      // history.push("/");
    } catch (error) {
      setError("Failed to sign in.");
      setLoading(false);
    }
    
  };

  const toggleSignUp = () => {
    setShowPassword(false);
    onToggle();
  }
  const onClose = () => {
    handleClose()
    setError("") 
  }
  // const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button className="login-button" variant="light" onClick={handleShow}>
        Login/Sign Up
      </Button> */}

      <Modal show={show} >
        <Modal.Header className="login-header">
          <Modal.Title style={{ margin: "auto"}}>
            <LockIcon style={{ fontSize:"5rem", marginTop:"15px"}}/>
          </Modal.Title>
          <Button variant="outline-dark" className="auth-closeButton" 
            onClick={onClose}
          >
            <CloseIcon />
          </Button>
        </Modal.Header>
        <Modal.Body style={{ padding: "2rem", paddingTop: "0"}}>
          <Card style={{ margin: "auto", maxWidth: "60%"}}>
            <Card.Body>
              <h2 className="text-center mb-4 mt-3">Login</h2>
              {/* {currentUser.email} */}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  {/* ref for POST value */}
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label className="mt-1">Password</Form.Label>
                  {/* ref for POST value */}
                  <Form.Control 
                    type={showPassword?"text":"password"} 
                    ref={passwordRef} required 
                  />
                </Form.Group>
                <Form.Check 
                  className="mt-2"
                  type="checkbox"
                  id="show-password"
                  label={`Show Password`}
                  onClick={()=>setShowPassword(!showPassword)}
                />                
                <Button
                  disabled={loading}
                  className="w-100 text-center mt-3"
                  style={{ height: "50px" }}
                  type="submit"
                >
                  Login
                </Button>
              </Form>
              {/* <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div> */}
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <a href="#signup" onClick={toggleSignUp}>Sign Up</a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;