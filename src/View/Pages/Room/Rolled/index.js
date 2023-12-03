import React, {useEffect, useState} from 'react';
import './index.css';
import {useDispatch, useSelector} from "react-redux";
import {setFetch} from "../../../../Application/Redux/Reducers/fetch";
import useFetch from "../../../../Application/Hooks/fetch";

export default function Rolled() {
    const roomId = useSelector(state => state.rooms.currentRoom._id)
    const user = useSelector(state => state.user);
    const {getData} = useFetch();
    const dispatch = useDispatch();
    const fetchRolledUser = useSelector(state => state.fetch.rolledUser);
    const [rolledUser, setRolledUser] = useState(false);
    useEffect(() => {
        dispatch(setFetch({field: 'rolledUser', value: true}))
    }, []);
    useEffect(() => {
        if (fetchRolledUser) {
            let room = user.rooms.filter((el) => {
                return el._id === roomId
            })
            console.log('rooommmm..: ', room)
            room && getData('GET', `user?id=${room[0].rolled}`).then(res => {
                console.log('rolled user res: ', res)
                setRolledUser(res);
            }).catch(err => {
                console.log('rolled user err: ', err.message)
            })
            dispatch(setFetch({field: 'rolledUser', value: false}))
        }
    }, [fetchRolledUser]);
    return (
        <div className='rolled'>
            <div className='rolled-title'>Kupujesz prezent dla:</div>
            <div className='rolled-person'>{rolledUser && rolledUser.name}</div>
        </div>
    )
}