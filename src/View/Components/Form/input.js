import React, {useEffect, useState} from 'react';
import './input.css';
import joi from "joi";
import {useDispatch, useSelector} from "react-redux";
import {clearField, setField} from "../../../Application/Redux/Reducers/forms";
import {clearError, setError} from "../../../Application/Redux/Reducers/errors";

export default function Input({label, name, validators, type, form, errorMsg}) {
    const [value, setValue] = useState('');
    const [blurred, setBlurred] = useState(false);
    const dispatch = useDispatch();
    const error = useSelector(state => state.errors.inputs[name])
    const handleChange = (e) => {
        e.preventDefault();

            dispatch(clearError({type: 'forms', field: 'login'}))
            dispatch(clearError({type: 'forms', field: 'signup'}))
            dispatch(clearError({type: 'forms', field: 'room'}))
        setValue(e.target.value)
    }


    useEffect(() => {
        if (!validators.validate(value).error) {
            dispatch(setError({type: 'inputs', field: name, value: false}))
            dispatch(setField({field: name, value: value, form: form}))
        } else {
            blurred && dispatch(setError({type: 'inputs', field: name, value: errorMsg}))
            dispatch(setField({field: name, value: false, form: form}))
        }

    }, [value]);

    //clean up reducers

    useEffect(() => {
        return ()=>{
            dispatch(clearField({form: form, field: name, value: false}))
        }
    }, []);

    return (
        <div className='Input' onFocus={() => {
            setBlurred(true)
        }}>
            <label>{label}</label>
            {type === 'text' && <input type='text' value={value} onChange={handleChange}/>}
            <div className='error input-error'>{error && error}</div>
        </div>
    )
}