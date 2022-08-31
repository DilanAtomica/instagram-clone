import React, {useContext, useEffect} from 'react';
import "./LoginPage.css";
import Logo from "../../Images/logo.png";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../utils/firebase";
import {AppContext} from "../../App";

const schema = yup.object().shape( {
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
}).required();

function LoginPage(props) {

    const navigate = useNavigate();
    const {user} = useContext(AppContext);

    useEffect(() => {
        user !== null && navigate("/home");
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async(data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="loginPage">
            <div className="loginContainer">
                <img alt="logo" src={Logo} />
                <form onSubmit={handleSubmit(submitForm)}>
                    <input {...register("email")} type="email" placeholder="Email" />
                    <p>{errors.email?.message}</p>
                    <input {...register("password")} type="password" placeholder="Password" />
                    <p>{errors.password?.message}</p>
                    <button type="submit">Log in</button>
                </form>
            </div>
                <p>Dont have an account? <span>Register now</span></p>
        </div>
    );
}

export default LoginPage;