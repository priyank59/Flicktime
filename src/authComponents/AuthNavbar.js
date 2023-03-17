import React from "react";
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AuthNavbar = () => {
    return (
        <React.Fragment>
            <Navbar expand="lg" className="navbar-dark bckg-dark code">
                <Container>
                    <Navbar.Brand>FlickTime</Navbar.Brand>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}

export default AuthNavbar;