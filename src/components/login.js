import React, { useState, setState} from "react";
import Header from "./header";
import RegistrationForm from "./registrationForm";
import "./style.css";
import Home from "./home";
import { Router,Link, Navigate, useNavigate } from "react-router-dom";

export const  Login=() =>{
  const navigate=useNavigate();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {

    return email.length > 0 && password.length > 0;

  }

  function handleSubmit(event) {
navigate('/home');
    

  }
  function handleRegistration(event)
  {
    //event.preventDefault();
    navigate('/registrationForm');
    
  }
  function handleForgotPassword(event)
  {
    navigate('/forgotPassword');
  }
  return (

    <><nav class="bg-dark navbar-dark navbar">
    <div className="row col-12 d-flex justify-content-center text-white">
        <h3>Login</h3>
    </div>
</nav><div className="form">
          <div className="form-body">

              <div className="email">
                  <label className="form__label" for="email">Email </label>
                  <input type="email" id="email" className="form__input" value={email} placeholder="Email" />
              </div>
              <div className="password">
                  <label className="form__label" for="password">Password </label>
                  <input className="form__input" type="password" id="password" value={password} placeholder="Password" /> <br />

              </div>


          </div>
          <div class="footer">
              <button onClick={() => handleSubmit()} type="submit" class="btn">Start Exploring</button>
              
          </div>
          
            <a onClick={()=>handleRegistration() } >Don't have an account? Create one. </a>
            <a onClick={()=>handleForgotPassword()} >Forgot Password?</a>
      </div>
      </>

  );

}

