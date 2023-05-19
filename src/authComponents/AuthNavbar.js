import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../components/logo.png';

const AuthNavbar = () => {
    return (
        <React.Fragment>
            <Navbar expand="lg" className="navbar-dark bckg-dark code">
                <Container style={{justifyContent:'left'}}>
                    <img src={logo} alt="Logo" className="logo-light-style" height="50" width="50"/>
                    <Navbar.Brand style={{color: "#befaf9"}}><h4 style={{marginLeft:10, marginTop:10}}><b>FlickTime</b></h4></Navbar.Brand>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}

export default AuthNavbar;