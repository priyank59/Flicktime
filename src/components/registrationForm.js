import React, {useState,setState} from 'react';
import './style.css'
import Header from './header';
import validator from 'validator';

// import {database} from '../firebase'
// import {ref,push,child,update} from "firebase/database";
//import Login from './login';
export const RegistrationForm=()=> {
    
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [phoneNumber, setNumber]=useState(null);
    const [securityAnswer, setAnswer]=useState(null);
    const [errorMessage, setErrorMessage] = useState('')
   
  const validate = (value) => {
 
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage('Strong Password')
    } else {
      setErrorMessage('Weak Password')
    }
  }
    function handleInputChange(e) {
        const { id, value } = e.target;
        if (id === "firstName") {
            setFirstName(value);
        }
        if (id === "lastName") {
            setLastName(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value);
        }
        if (id == "phoneNumber") {
            setNumber(value);
        }
        if (id=="securityAnswer")
        {
            setAnswer(value);
        }
    }
    
    function handleSubmit() {
        console.log(firstName, lastName, email, password, confirmPassword, phoneNumber, securityAnswer);
       
    }
    // const handleSubmit = () =>{
    //     let obj = {
    //             firstName : firstName,
    //             lastName:lastName,
    //             email:email,
    //             password:password,
    //             confirmPassword:confirmPassword,
    //             phoneNumber:phoneNumber,
    //         }       
    //     const newPostKey = push(child(ref(database), 'posts')).key;
    //     const updates = {};
    //     updates['/' + newPostKey] = obj
    //     return update(ref(database), updates);
    // }
    return(
        <><Header> </Header><div className="form">
            <label><b><h3>Hello New User. Create your account</h3></b></label>
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="firstName">First Name </label>
                    <input className="form__input" type="text" value={firstName} onChange={(e) => handleInputChange(e)} id="firstName" placeholder="First Name" />
                </div>
                <div className="lastname">
                    <label className="form__label" for="lastName">Last Name </label>
                    <input type="text" name="" id="lastName" value={lastName} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="LastName" />
                </div>
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input type="email" id="email" className="form__input" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password" id="password" value={password} onChange={(e) => validate(e.target.value)} placeholder="Password" /> <br />
                    {errorMessage === '' ? null :

                        errorMessage == 'Strong Password' ?
                            <span style={{
                                margin: 170,
                                color: 'green',
                            }}>{errorMessage}</span> :
                            <span style={{
                                margin: 170,
                                color: 'red',
                            }}>{errorMessage}</span>}
                </div>
                <div className="confirm-password">
                    <label className="form__label" for="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => handleInputChange(e)} placeholder="Confirm Password" />
                </div>
                <div className="phoneNumber">
                    <label className="form__label" for="phoneNumber">Phone Number </label>
                    <input type="text" name="" id="" value={phoneNumber} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="Phone Number" />
                </div>
<div>
<label>

<b>Security  Question</b><br/></label>
 <select >

   <option value="ques1">What city were you born in?</option>
   <option value="ques2">What was the first concert you attended?</option>
   <option value="ques3">What primary school did you attend?</option>
   <option value="ques4">In what town or city was your first full time job?</option>
 </select>
</div>
<div className="securityAnswer">
    <label className="form__label" for="securityAnswer"><b>Security Answer </b></label>
    <input type="text" name="" id="" value={securityAnswer} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="Security Answer" />
</div>
            </div>
            <div class="footer">
                <button onClick={() => handleSubmit()} type="submit" class="btn">Get Started</button>
            </div>
           
        </div></>
        
       
    )       
}

export default RegistrationForm