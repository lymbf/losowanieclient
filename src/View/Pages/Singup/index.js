import React from 'react';
import './index.css';
import Input from "../../Components/Form/input";
import joi from "joi";
import useSignup from "./Controller/signup";
import {useSelector} from "react-redux";

export default function SignUp() {
    const {signup} = useSignup();
    const signupError = useSelector(state=>state.errors.forms.signup)
    return (
        <div className='Signup'>

            <form onSubmit={signup}>
                <Input type='text' name='name' label='name' form='signup' validators={joi.string().min(4)}
                       errorMsg='Incorrect name -> min 4 signs'/>
                <Input type='text' name='password' label='password' form='signup' validators={joi.string().min(8)}
                       errorMsg='Incorrect password -> min 8 signs'/>
                {signupError && <div className = 'error form-error'>{signupError}</div>}
                <button className = 'hov' type='submit'>Create Account</button>
            </form>
        </div>
    )
}