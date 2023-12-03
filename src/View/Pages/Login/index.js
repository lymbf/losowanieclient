import React from 'react';
import './index.css';
import Input from "../../Components/Form/input";
import joi from 'joi';
import useLogin from "./Controller/login";
import {useSelector} from "react-redux";

export default function Login() {
    const loginError = useSelector(state=>state.errors.forms.login)
    const {login} = useLogin();
    return (
        <div className='Login'>

            <form onSubmit={login}>
                <Input label='name' form='login' name='name' validators={joi.string().min(4).lowercase()} type='text'
                       errorMsg='Incorrect name -> min 4 signs'/>
                <Input label='password' form='login' name='password' validators={joi.string().min(8)} type='text'
                       errorMsg='Incorrect password -> min 8 signs'/>
                {loginError && <div className = 'error form-error'>{loginError}</div>}
                <button className = 'hov' type='submit'>LogIn</button>
            </form>
        </div>
    )
}