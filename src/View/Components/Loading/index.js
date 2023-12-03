import React from 'react';
import './index.css';
import {createPortal} from "react-dom";

export default function Loading() {
    return (
        createPortal(<div className='Loading'>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>, document.getElementById('loading'))
    )
}