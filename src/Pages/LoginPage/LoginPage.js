import React from 'react';
import "./LoginPage.css";
import Logo from "../../Images/logo.png";

function LoginPage(props) {
    return (
        <div className="loginPage">
            <div className="loginContainer">
                <img alt="logo" src={Logo} />
                <form>
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Password" />
                    <button type="submit">Log in</button>
                </form>
            </div>
                <p>Dont have an account? <span>Register now</span></p>
        </div>
    );
}

export default LoginPage;