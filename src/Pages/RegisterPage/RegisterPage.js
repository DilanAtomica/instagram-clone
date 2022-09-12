import React, {useContext, useEffect} from 'react';
import "./RegisterPage.css";
import Logo from "../../Images/logo.png";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {collection, addDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {db, auth} from "../../utils/firebase";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../App";

const schema = yup.object().shape( {
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(6).max(54)
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/\d+/, "One number"),
    confirmPassword: yup.string().required("Confirm password is required").
    oneOf([yup.ref("password")], "Password must and should match"),
}).required();

function RegisterPage(props) {

    const navigate = useNavigate();
    const usersCollection = collection(db, "users")
    const {user} = useContext(AppContext);

    useEffect(() => {
        user !== null && navigate("/home");
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async(data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            await addDoc(usersCollection, {username: data.username, email: data.email, avatar: "https://cdn130.picsart.com/344993131001211.png"});
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="registerPage">
            <div className="registerContainer">
                <img alt="logo" src={Logo} />
                <form onSubmit={handleSubmit(submitForm)}>
                    <input {...register("email")} type="email" placeholder="Email" />
                    <p>{errors.email?.message}</p>
                    <input {...register("username")} type="text" placeholder="Username" />
                    <p>{errors.username?.message}</p>
                    <input {...register("password")} type="password" placeholder="Password" />
                    <p>{errors.password?.message}</p>
                    <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" />
                    <p>{errors.confirmPassword?.message}</p>
                    <button type="submit">Register</button>
                </form>
            </div>
            <p>Already have an account? <span>Log in now</span></p>
        </div>
    );
}

export default RegisterPage;