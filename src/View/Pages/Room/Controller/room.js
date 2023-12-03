import {useEffect} from "react";
import useFetch from "../../../../Application/Hooks/fetch";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearError, setError} from "../../../../Application/Redux/Reducers/errors";
import {clearCurrentRoom, setCurrentRoom} from "../../../../Application/Redux/Reducers/rooms";
import {setFetch} from "../../../../Application/Redux/Reducers/fetch";
import {updateRolledUser} from "../../../../Application/Redux/Reducers/user";
import {useNavigate} from "react-router-dom";

export default function useRoom(){
    const fetchRoom = useSelector(state=>state.fetch.room);
    const userId = useSelector(state=>state.user._id)
    const {getData} = useFetch();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roomId = window.location.pathname.split('room/')[1];
    const rollError = useSelector(state=>state.errors.room.roll);
    const unrollError = useSelector(state=>state.errors.room.unroll)
    const leaveError = useSelector(state=>state.errors.room.leave)

    useEffect(() => {
        dispatch(setFetch({field: 'room', value: true}))
    }, []);

    useEffect(() => {
        if(fetchRoom){
            getData('GET', `room/${roomId}`).then(res=>{
                console.log('res: ', res)
                dispatch(setCurrentRoom(res.data))
            }).catch(err=>{
                console.log('error msg: ', err.message);
                dispatch(setError({type: 'room', field: 'fetch'}))
            })
            dispatch(setFetch({field: 'room', value: false}))
        }
    }, [fetchRoom]);

    useEffect(()=>{
        rollError && setTimeout(()=>{dispatch(clearError({type: 'room', field: 'roll'}))}, 2000)
        leaveError && setTimeout(()=>{dispatch(clearError({type: 'room', field: 'leave'}))}, 2000)
        unrollError && setTimeout(()=>{dispatch(clearError({type: 'room', field: 'unroll'}))}, 2000)
    },[rollError, leaveError, unrollError])

    useEffect(()=>{
        return ()=>{dispatch(clearCurrentRoom())}
    },[])

    const rollGifts = ()=>{
        getData('POST', `room/${roomId}/roll`).then(r=>{
            console.log('res: ', r);
            getData('GET', `user?id=${userId}`).then(r=>{
                dispatch(updateRolledUser(r.rooms));
            }).catch(err=>{
                console.log('error updating user: ', err.message)
            })
            dispatch(setFetch({field: 'room', value: true}))
            dispatch(setFetch({field: 'rolledUser', value: true}))

        }).catch(err=>{
            console.log('rolling error: ', err.message)
            dispatch(setError({type: 'room', field: 'roll', value: err.message}))
        })
    }

    const leaveRoom = ()=>{
        console.log('leaving room..');
        getData('DELETE', `room/${roomId}/user/${userId}`).then(r=>{
            console.log('leaving room res: ', r);
            navigate('/')
        }).catch(err=>{
            console.log('leaveing room error: ', err.message)
            dispatch(setError({type: 'room', field: 'leave', value: err.message}))
        })
    }

    const unroll = ()=>{
        console.log('unrolling....');
        getData('POST', `room/${roomId}/unroll`).then(r=>{
            console.log('unrolling res: ', r);
            dispatch(setFetch({field: 'room', value: true}))
            dispatch(setFetch({field: 'rolledUser', value: true}))
            getData('GET', `user?id=${userId}`).then(r=>{
                dispatch(updateRolledUser(r.rooms))
            }).catch(err=>{
                console.log('error obtaining new user data', err.message)
            })
        }).catch(err=>{
            console.log('unrolling error: ', err.message)
            dispatch(setError({type: 'room', field: 'unroll'}))
        })
    }

    return {rollGifts, leaveRoom, unroll}
}