import React from 'react';
import './index.css';
import {useSelector} from "react-redux";

export default function Avatar({logout}) {
    const userName = useSelector(state=>state.user.name)
    return (
        <div className='hall-avatar'>
            <span className="material-symbols-outlined">
                account_circle
            </span>
            <div className = 'avatar-name'>{userName}</div>
            <div className='logout hov' onClick={logout}>Logout</div>
        </div>
    )
}