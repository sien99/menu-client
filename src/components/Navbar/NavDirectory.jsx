import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';


const NavDirectory = () => {
    return (
        <Navbar sticky="top" collapseOnSelect expand="sm" bg="light" variant="light" className="nav-secondary">
            <Container fluid className="nav-directory">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#Appetizer">Appetizer</Nav.Link>
                        <Nav.Link href="#Rice">Rice</Nav.Link>
                        <Nav.Link href="#Noodles">Noodles</Nav.Link>
                        <Nav.Link href="#Vegetables">Vegetables</Nav.Link>
                        <Nav.Link href="#Soup">Soup</Nav.Link>
                        <NavDropdown title="Others" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#Appetizer">Appetizer
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#Rice">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#Noodles">Vegetables</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#Vegetables">Separated link</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavDirectory
