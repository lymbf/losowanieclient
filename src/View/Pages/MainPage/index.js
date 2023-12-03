import React from 'react';
import './index.css';
import {useSelector} from "react-redux";
import MainHall from "./MainHall";
import Home from "./Home";

export default function MainPage() {
    const {loggedIn} = useSelector(state=>state.user)
    return (
        <div className = 'MainPage'>
            {loggedIn ? <MainHall/> : <Home/>}
        </div>
    )
}