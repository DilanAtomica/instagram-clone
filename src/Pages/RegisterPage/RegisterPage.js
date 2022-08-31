import React from 'react';
import "./RegisterPage.css";
import Logo from "../../Images/logo.png";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {collection, addDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {db, auth} from "../../utils/firebase";

const schema = yup.object().shape( {
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(6).max(54),
    confirmPassword: yup.string().required("Confirm password is required").
    oneOf([yup.ref("password")], "Password must and should match"),
}).required();

function RegisterPage(props) {

    const usersCollection = collection(db, "users")

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async(data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            await addDoc(usersCollection, {username: data.username, email: data.email, imageUrl: ""})
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