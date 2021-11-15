import React, { useState, useRef } from "react";
import { Button, Modal, Card, Alert, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';

const Login = ({ show, handleClose, onToggle }) => {

  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  // const { login, currentUser } = useAuth()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true); //to prevent user accidentally click multi times
      console.log(emailRef.current.value, passwordRef.current.value);
      // await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      setError("Failed to sign in.");
    }
    setLoading(false);
  };

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
            onClick={()=>handleClose()}
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
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Button
                  disabled={loading}
                  className="w-100 text-center mt-3"
                  style={{ height: "50px" }}
                  type="submit"
                >
                  Login
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <a href="#signup" onClick={onToggle}>Sign Up</a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;