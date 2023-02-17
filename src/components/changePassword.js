import React , {useState,setState} from "react";
import './style.css'
import Header from './header';
import validator from 'validator';
import { Router,Link, Navigate, useNavigate } from "react-router-dom";
export const ChangePassword=()=>
{
    const navigate=useNavigate();
    const [password,setPassword] = useState(null);
    const [newPassword, setNewPassword]=useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessage1, setErrorMessage1] = useState('');
    const value_password="";
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
      const PasswordValidate=(value1, value2)=>{
        console.log(value1,value2);
        if(value1==value2)
        {
            setErrorMessage1('Password Match')
        }
        else
        {
            setErrorMessage1('Password does not Match');
        }
      }
      function handleSubmit(event)
      {
navigate('/home');
      }
return(
    <><nav class="bg-dark navbar-dark navbar">
        <div className="row col-12 d-flex justify-content-center text-white">
            <h3>Change Password</h3>
        </div>
    </nav>
    <div className="form">
    <div className="password">
            <label className="form__label" for="password">Password </label>
            <input className="form__input" type="password" id="password" value={password} onChange={(e) => validate(e.target.value) } value_password="password" placeholder="Password" /> <br />
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

    <div className="newPassword">
            <label className="form__label" for="newPassword">New Password </label>
            <input className="form__input" type="password" id="newPassword" value={newPassword} onChange={(e) => PasswordValidate(value_password,e.target.value)} placeholder="New Password" /> <br />
            
            {

                    errorMessage1 == 'Password Match' ?
                    <span style={{
                        margin: 170,
                        color: 'green',
                    }}>{errorMessage1}</span> :
                    <span style={{
                        margin: 170,
                        color: 'red',
                    }}>{errorMessage1}</span>}
    </div>
    <div class="footer">
              <button onClick={() => handleSubmit()} type="submit" class="btn">Submit</button> 
          </div>               
</div></>
)
}
export default ChangePassword;