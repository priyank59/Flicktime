import React, { useState, setState} from "react";
import Header from "./header";
import RegistrationForm from "./registrationForm";
import "./style.css";
export const Home=()=>{
return(
    <nav class="bg-dark navbar-dark navbar">
    <div className="row col-12 d-flex justify-content-center text-white">
        <h3>Home</h3>
    </div>
</nav>
)
}
export default Home;