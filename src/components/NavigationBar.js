import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from "axios";
import logo from './logo.png';

import { Nav } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

const NavigationBar = () => {

    const navigate = useNavigate();
    const recommendationAPI = '/recommend';
    var email;
    var movieIdList;

    const logout = async () => {
        email = localStorage.getItem('email');
        console.log(email);

        const docRef = doc(projectFirestore, "userHistory", email);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            console.log(docSnap.data().historyList);
            movieIdList = docSnap.data().historyList;
        }
        
        axios.post(recommendationAPI, { "movieIdList" : movieIdList})
        .then((response) => {
          console.log(response.data)
          setDoc(doc(projectFirestore, "userRecommendations", email), {
            recommendationList: response.data
          })
        })

        localStorage.clear();
        navigate('/authComponents/AuthLogin');
    }

    return (
    
        <React.Fragment>
            <Navbar expand="lg" className="navbar-dark bckg-dark code">
                <Container>
                    
                    <img src={logo} alt="Logo" className="logo-light-style" height="50" width="50"/>
                    
                    <Link to="/Home" className="btn-light-style"><h4 style={{marginLeft:10, marginTop:10}}><b>FlickTime</b></h4></Link>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {/* <img src={logo} alt="Logo"/>; */}
                            <NavDropdown title="More" id="collasible-nav-dropdown">
                                <NavDropdown.Item><Link to="/Profile" className="btn-dark-style">Profile</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/About" className="btn-dark-style">About</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}> <Link className="btn-dark-style">Logout</Link></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </React.Fragment>
    );
}

export default NavigationBar;