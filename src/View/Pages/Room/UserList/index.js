import React, {useEffect, useState} from 'react';
import './index.css';
import {useDispatch, useSelector} from "react-redux";
import useFetch from "../../../../Application/Hooks/fetch";
import {setFetch} from "../../../../Application/Redux/Reducers/fetch";
import {clearError, setError} from "../../../../Application/Redux/Reducers/errors";

export default function UserList() {
    const {users} = useSelector(state => state.rooms.currentRoom)
    const roomId = useSelector(state => state.rooms.currentRoom._id)
    const roomName = useSelector(state=>state.rooms.currentRoom.name)
    const rolled = useSelector(state=>state.rooms.currentRoom.rolled)
    const hostId = useSelector((state => state.rooms.currentRoom.host))
    const userId = useSelector(state => state.user._id)
    const removeError = useSelector(state => state.errors.room.removeUser)
    const dispatch = useDispatch();
    const {getData} = useFetch();
    const [fetched, setFetched] = useState(false);
    const fetchUsers = useSelector(state => state.fetch.users)
    const [list, setList] = useState([]);

    const removeUser = async (uid) => {
        try {
            let res = await getData('DELETE', `room/${roomId}/user/${uid}`)
            console.log('i think deleted user')
            dispatch(setFetch({field: 'room', value: true}))
        } catch (err) {
            console.log('removing error: ', err.message)
            dispatch(setError({type: 'room', field: 'removeUser', value: err.message}))
        }
    }


    useEffect(() => {
        if (users) {
            const getUsers = async () => {
                let arr = [];
                for (let i = 0; i < users.length; i++) {
                    try {
                        let u = await getData('GET', `user?id=${users[i]._id}`)
                        arr.push(u)
                    } catch (err) {
                        console.log('error getting users: ', err.message)
                    }
                }
                return arr
            }
            getUsers().then(r => {
                setList(r)
            })
        }
    }, [users]);

    useEffect(() => {
        return () => {
            setList([]);
            dispatch(clearError({type: 'room', field: 'removeUser'}))
        }
    }, []);

    useEffect(() => {
        if (removeError) {
            setTimeout(() => {
                dispatch(clearError({type: 'room', field: 'removeUser'}))
            }, 2000)
        }
    }, [removeError])

    return (
        <div className='UserList'>
            <div className={'ul-title'}>Użytkownicy w pokoju <span>{roomName}</span>:</div>
            <div className='ul-list'>{list.map(user => {
                return <div className='ul-user'>
                    <div className='ul-user-name'>{user.name}
                        {(userId === hostId && !rolled) &&
                            <span className="material-symbols-outlined hov" onClick={() => {
                                removeUser(user._id)
                            }}>
                                delete
                             </span>}
                    </div>
                    {(removeError && (user._id === hostId)) && <div className='error remove-error'>{removeError}</div>}
                </div>
            })}</div>
        </div>
    )
}