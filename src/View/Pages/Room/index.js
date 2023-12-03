import React from 'react';
import './index.css';
import useRoom from "./Controller/room";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../../Application/Redux/Reducers/user";
import Avatar from "../../Components/Avatar";
import NotRolled from "./NotRolled";
import Rolled from "./Rolled";
import UserList from "./UserList";

export default function Room() {
    const fetchError = useSelector(state => state.errors.room.fetch);
    const leaveError = useSelector(state => state.errors.room.leave);
    const rollError = useSelector(state=>state.errors.room.roll)
    const userId = useSelector(state => state.user._id)
    const {host, name, rolled, users} = useSelector(state => state.rooms.currentRoom)
    const dispatch = useDispatch();
    const {rollGifts, leaveRoom, unroll} = useRoom();
    return (
        <div className='Room'>
            {fetchError && <div className='error room-error'>{fetchError}</div>}
            <div className='room-left'>
                <div className='avatar-cont'>
                    <Avatar logout={() => {
                        dispatch(logOut())
                    }}/>
                    <div className='leave-room hov' onClick = {leaveRoom} >Leave Room</div>
                </div>
                {leaveError && <div className='error leave-error'>{leaveError}</div>}
                {rolled ? <Rolled/> : <NotRolled/>}

                {((host) && userId.toString() === host.toString()) && !rolled &&
                    <div className='roll-button hov' onClick = {rollGifts}>{rolled ? 'losuj ponownie' : 'losuj'}</div>}
                {rollError &&  <div className = 'error rolling-error'>{rollError && rollError}</div>}
                {((host) && userId.toString() === host.toString()) && rolled && <div className = 'roll-button unroll hov' onClick ={unroll}>cofnij losowanie</div>}
            </div>
            <div className='room-right'><UserList/></div>
        </div>
    )
}