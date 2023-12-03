import React, {useEffect} from 'react';
import './index.css';
import {createPortal} from "react-dom";
import Input from "../Form/input";
import joi from "joi";
import {useDispatch, useSelector} from "react-redux";
import {clearError} from "../../../Application/Redux/Reducers/errors";

export default function RoomFormModal({type, hide, submit}) {
    const formError = useSelector(state => state.errors.forms.room);
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(clearError({type: 'forms', field: 'room'}))
        }
    }, []);
    return (
        createPortal(
            <div className='RoomFormModal'>
                <div className='shadow hov' onClick={hide}></div>
                <form className='room-form' onSubmit={submit}>
                    <Input type='text' label='Room Name' name='room_name' validators={joi.string().min(6).max(16)}
                           form='room_form' errorMsg='min 6, max 16 sign, cheers'/>
                    <button type='submit' className='hov'>{type || 'join'}</button>
                    {formError && <div className='error form-error'>{formError}</div>}
                </form>
            </div>,
            document.getElementById('room_form'))

    )
}