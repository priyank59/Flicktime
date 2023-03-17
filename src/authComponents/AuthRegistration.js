import axios from "axios";
import React from "react";
// import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { projectFirestore } from '../firebase/config';
import { doc, setDoc } from "firebase/firestore"; 

const AuthRegistration = () => {

    const registrationAPI = '/registration';
    const navigate = useNavigate();

    const submitRegistrationForm = (event) => {
        event.preventDefault();
        const formElement = document.querySelector('#registrationForm');
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#registration-btn');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disabled', true);
        
        axios.post(registrationAPI, formDataJSON)
        .then((response) => {
            btnPointer.innerHTML = 'Register';
            btnPointer.removeAttribute('disabled');
            const data = response.data;
            const token = data.idToken;

            if (!token) {            
                toast.error('Unable to create a User, Please try again after some time!!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                return;
            }
            setTimeout(async () => {
                toast.success('Please verify your email!!',{
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });               
                
                await setDoc(doc(projectFirestore, "userDetails", formDataJSON.email), {
                    firstName: formDataJSON.firstName,
                    lastName: formDataJSON.lastName
                })

                navigate('/authComponents/AuthLogin');
            }, 500);

        }).catch((error) => {
            btnPointer.innerHTML = 'Register';
            btnPointer.removeAttribute('disabled');
            
            if(error.response.status === 400){
                toast.info('User Already Exists!!', {
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
                toast.error('Error Creating in User', {
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
                <h2 className="fw-normal mb-5">FlickTime</h2>
                <Row>
                    <Col md={{span: 6}}>
                        <Form id="registrationForm" className="centered-contents" onSubmit={submitRegistrationForm}>
                            <FormGroup className="mb-3">
                                <FormLabel>First Name</FormLabel>
                                <input type={'text'} className="form-control" name="firstName" required />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormLabel>Last Name</FormLabel>
                                <input type={'text'} className="form-control" name="lastName" required />
                            </FormGroup>  
                            <FormGroup className="mb-3">
                                <FormLabel>Email Address</FormLabel>
                                <input type={'text'} className="form-control" name="email" required />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormLabel>Password</FormLabel>
                                <input type={'password'} className="form-control" name="password" required />
                            </FormGroup>                          
                            <Button type="submit" className="btn-success mt-2" id="registration-btn">Register</Button>
                        </Form>
                        <Link to="/authComponents/AuthLogin">Back to Login</Link>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}

export default AuthRegistration;