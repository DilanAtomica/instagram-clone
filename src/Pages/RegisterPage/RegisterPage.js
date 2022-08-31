import React from 'react';
import "./RegisterPage.css";
import Logo from "../../Images/logo.png";

function RegisterPage(props) {
    return (
        <div className="registerPage">
            <div className="registerContainer">
                <img alt="logo" src={Logo} />
                <form>
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button type="submit">Register</button>
                </form>
            </div>
            <p>Already have an account? <span>Log in now</span></p>
        </div>
    );
}

export default RegisterPage;