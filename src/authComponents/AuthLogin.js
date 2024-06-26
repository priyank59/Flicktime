import axios from "axios";
import React from "react";
import { Button, Col, Container, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthLogin = () => {

    const loginAPI = '/login';
    const navigate = useNavigate();

    const submitLoginForm = (event) => {
        event.preventDefault();
        const formElement = document.querySelector('#loginForm');
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#login-btn');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disabled', true);
        
        axios.post(loginAPI, formDataJSON)
        .then((response) => {
            btnPointer.innerHTML = 'Login';
            btnPointer.removeAttribute('disabled');
            console.log(response);
            if(response.status === 200){
                const data = response.data;
                const token = data.idToken;
                if (!token) {

                    toast.error('Please try again after some time!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                    // alert('Unable to login. Please try after some time.');
                    return;
                }
                localStorage.clear();
                localStorage.setItem('user-token', token);
                setTimeout(() => {
    
                    toast.success('Login Successfully!!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                    localStorage.setItem('email', formDataJSON.email);
                    navigate('/');
                }, 500);
            }
        }).catch((error) => {
            
            btnPointer.innerHTML = 'Login';
            btnPointer.removeAttribute('disabled');
            console.log(error.response.status);

            if(error.response.status === 401){

                toast.info('Please verify your email address before login!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                // alert('Unable to login. Please try after some time.');
                return;
            }
            else{
                toast.error('Incorrect the email or password', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        });
    }

    return (
        <React.Fragment>
            <Container className="my-5 code">
                <h2 className="fw-normal mb-5">Login to FlickTime</h2>
                <Row>
                    <Col md={{span: 6}}>
                        <Form id="loginForm" onSubmit={submitLoginForm}>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor={'login-username'}>Email</FormLabel>
                                <input type={'text'} className="form-control" id={'login-username'} name="email" default="demo03613@gmail.com" required />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor={'login-password'}>Password</FormLabel>
                                <input type={'password'} className="form-control" id={'login-password'} name="password" default="demo@1234" required />
                            </FormGroup>
                            <Button type="submit" className="btn-success mt-2" id="login-btn">Login</Button>
                        </Form>
                        <Link to="/authComponents/AuthRegistration">New User?</Link>
                    </Col>
                </Row>
                <p style={{marginLeft:"25px", marginBottom:"0px"}}> Demo Email: demotest4512@yahoo.com</p>
                <p style={{marginLeft:"25px"}}> Demo Password: demo@1234</p>
            </Container>
        </React.Fragment>
    );
}

export default AuthLogin;