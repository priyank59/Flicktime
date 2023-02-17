import React, { useState, setState} from "react";
import "./style.css";
import ChangePassword from "./changePassword";
import { Router,Link, Navigate, useNavigate } from "react-router-dom";
export const  ForgotPassword=() =>{
    const navigate=useNavigate();
    const [email, setEmail] = useState(null);
    const [securityAnswer, setAnswer]=useState(null);
    function handleInputChange(e) {
        const { id, value } = e.target;
       
        if (id === "email") {
            setEmail(value);
        }
       
        if (id=="securityAnswer")
        {
            setAnswer(value);
        }
    }
    function handleSubmit(event)
    {
        navigate('/changePassword');
    }
    return(
    <><nav class="bg-dark navbar-dark navbar">
            <div className="row col-12 d-flex justify-content-center text-white">
                <h3>Forgot Password</h3>
            </div>
        </nav>
        <div className="form">
                 <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input type="email" id="email" className="form__input" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
                </div>
                <div>
                    <label><b>Security  Question</b></label>
                    <br/>
                    <select >
                    <option value="ques1">What city were you born in?</option>
                    <option value="ques2">What was the first concert you attended?</option>
                    <option value="ques3">What primary school did you attend?</option>
                    <option value="ques4">In what town or city was your first full time job?</option>
                    </select>
                </div>
                <br/>
                <div className="securityAnswer">
                    <label className="form__label" for="securityAnswer"><b>Security Answer </b></label>
                    <input type="text" name="" id="" value={securityAnswer} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="Security Answer" />
                </div>
                <br/>
                <div class="footer">
                <button onClick={() => handleSubmit()} type="submit" class="btn">Next</button>
            </div>
        </div>
    </>
    )
};
export default ForgotPassword;
