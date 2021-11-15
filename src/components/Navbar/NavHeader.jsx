import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Auth from '../Auth/Auth';
import Cart from '../Cart/Cart';
import logo from '../../logo.png'



const NavHeader = ({cartItems, editItem}) => {
    const [isExpand, setIsExpand] = useState(false)
    return (
        <Navbar sticky="top" bg="dark" variant="dark" expand="md" expanded={isExpand}>
            <Container fluid className="header-container">
                <Navbar.Toggle onClick={()=>setIsExpand(prev=>!prev)} aria-controls="basic-navbar-nav" />

                <Navbar.Brand href="#home">        
                    <img
                        alt=""
                        src={logo}
                        width="15"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}Wayfarer's
                </Navbar.Brand>
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <hr className="header-hr"/>
                    <Nav>
                        <Auth />
                    </Nav>
                </Navbar.Collapse>

                <Cart 
                    cartItems={cartItems}
                    editItem={editItem}
                />
                
            </Container>
        </Navbar>
    )
}

export default NavHeader
