import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
// import logo from './dropdown.png';

import { Button, Nav } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const NavigationBar = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/authComponents/AuthLogin');
    }

    return (

    
        <React.Fragment>
            <Navbar expand="lg" className="navbar-dark bckg-dark code">
                <Container>
                    <Link className="me-auto btn-light-style" to="/Home"><h5><b>FlickTime</b></h5></Link>
                      
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-light">Search</Button>
                            </Form>
                            {/* <img src={logo} alt="Logo"/>; */}
                            <NavDropdown title="More" id="collasible-nav-dropdown">
                                <NavDropdown.Item><Link to="/Profile" className="btn-dark-style">Profile</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/About" className="btn-dark-style">About</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </React.Fragment>
    );
}

export default NavigationBar;