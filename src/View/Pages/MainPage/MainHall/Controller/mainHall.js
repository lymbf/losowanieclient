import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../../../../Application/Redux/Reducers/user";
import {useEffect, useState} from "react";
import useFetch from "../../../../../Application/Hooks/fetch";
import {clearRooms, setRooms} from "../../../../../Application/Redux/Reducers/rooms";
import {useNavigate} from "react-router-dom";
import {setError} from "../../../../../Application/Redux/Reducers/errors";

export default function useMainHall() {
    const [joinRoomModal, setJoinRoomModal] = useState(false);
    const [createRoomModal, setCreateRoomModal] = useState(false);
    const [reFetchRooms, setReFetchRooms] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roomName = useSelector(state=>state.forms.room_form.room_name);
    const {getData} = useFetch()
    //get list of users rooms

    useEffect(() => {
        if(reFetchRooms){
            getData('GET', 'room').then(res => {
                if (!res.error) {
                    dispatch(setRooms(res.data.map(room => {
                        const {_id, name, host, rolled} = room;
                        return {_id, name, host, rolled}
                    })))
                    setReFetchRooms(false);
                }
            }).catch(err=>{
                console.log('no rooms found')
            })
        }

    }, [reFetchRooms]);

    useEffect(() => {
        return ()=>{
            dispatch(clearRooms())
        }
    }, []);

    const logout = () => {
        dispatch(logOut());
    }



    const createRoom = (e)=>{
        e.preventDefault();
        if(roomName){
            getData('POST', 'room', {name: roomName}).then(res=>{
                console.log('res: ', res);
                navigate(`/room/${res.data._id}`)
            }).catch(err=>{
                dispatch(setError({type: 'forms', field: 'room', value: err.message}))
                console.log('error: ', err.message)
            })
        }
    }

    const joinRoom = (e)=>{
        e.preventDefault();
        if(roomName){
            getData('POST', `room/join/${roomName}`).then(res=>{
                console.log('res: ', res);
                setReFetchRooms(true)
                setJoinRoomModal(false)

            }).catch(err=>{
                dispatch(setError({type: 'forms', field: 'room', value: err.message}))
            })
        }
    }

    return {logout, createRoom, joinRoom, joinRoomModal, setJoinRoomModal, createRoomModal, setCreateRoomModal}
}