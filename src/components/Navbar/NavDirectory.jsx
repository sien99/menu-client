import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import useWindowDimensions from '../../helper/helper'

const NavDirectory = () => {
    const { width: windowWidth } = useWindowDimensions()
    
    return (
        <Navbar sticky="top" collapseOnSelect expand={true} bg="light" variant="light" className="nav-secondary">
            <Container fluid className="nav-directory">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    { windowWidth>576 ?
                        <>
                        <Nav.Link href="#Appetizer">Appetizer</Nav.Link>
                        <Nav.Link href="#Rice">Rice</Nav.Link>
                        <Nav.Link href="#Noodles">Noodles</Nav.Link>
                        {/* <Nav.Link href="#Vegetables">Vegetables</Nav.Link>
                        <Nav.Link href="#Soup">Soup</Nav.Link> */}
                        </>
                        :
                        <NavDropdown title="Food" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#Appetizer">Appetizer
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#Rice">Rice</NavDropdown.Item>
                            <NavDropdown.Item href="#Noodles">Noodles</NavDropdown.Item>
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item href="#Vegetables">Separated link</NavDropdown.Item> */}
                        </NavDropdown>
                    }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavDirectory
