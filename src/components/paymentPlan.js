import React, {useState,setState} from 'react';
import './style.css';

// import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export const PaymentPlan=()=> {
    
    function handleSubmit() {
        console.log();
    }

    function handleChange() {
        console.log();
    }

    return(
    <>
        <nav class="nav_strip">
            <div className="row col-12 d-flex justify-content-center text_light">
                <h3>Payment Plan</h3>
            </div>
        </nav>

        <br/><br/>

        <div class="row">
            <div class="col-3"></div>
            <div class="col-3 text_dark" align="center">
                <h5><b>BAISC MEMBERSHIP</b></h5>
            </div>
            <div class="col-3 text_dark" align="center">
                <h5><b>PRMEIUM MEMBERSHIP</b></h5>
            </div>
            <div class="col-3"></div>
        </div>

        <div class="row">
        <div align="center" class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
            <div class="col-3"></div>
            <div class="col-6">
                <button class="btn btn-grp" for="Plan1">
                    <div align="center">
                        <h5><b>ONLY ONE USER PER ACCOUNT!</b></h5> <br/><br/><br/>
                        A user will have one account under this payment plan. <br/>
                        You can enjoy the content anytime anywhere now. 
                    </div>
                </button>
            </div>
            <div class="col-6">
                <button class="btn btn-grp" for="Plan2">
                    <div align="center">
                        <h5><b>FOUR USERS PER ACCOUNT!!</b></h5> <br/><br/><br/>
                        Enjoy total four accounts if you go with this option.<br/>
                        Switch and organize the content as per your wish. 
                    </div>
                </button>
            </div>
            <div class="col-3"></div>
        </div>
        </div>

        <br/> <br/> <br/>
        
        <div class="footer">
            <button onClick={()=>handleSubmit()} type="submit" class="btn submit_btn">Purchase the selected plan...</button>
        </div>
    </>  
)
};
export default PaymentPlan;
