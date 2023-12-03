import React from 'react';
import './index.css';
import {useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    return (
        <div className='Home'>
            <div className='home-left'>
                <div className='image-presents'/>
                asd
            </div>
            <div className={'home-right'}>
                <div onClick={() => {
                    navigate('/login')
                }} className='login-button auth-button'>Zaloguj się
                </div>
                <div>Lub</div>
                <div onClick={() => {
                    navigate('/signup')
                }} className='signup-button auth-button'>Załóż konto
                </div>
            </div>
        </div>
    )
}