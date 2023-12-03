import React, {useState} from 'react';
import './index.css';
import useMainHall from "./Controller/mainHall";
import {useSelector} from "react-redux";
import RoomFormModal from "../../../Components/RoomFormModal";
import {useNavigate} from "react-router-dom";
import Avatar from "../../../Components/Avatar";

export default function MainHall() {

    const {
        logout,
        createRoom,
        joinRoom,
        joinRoomModal,
        setJoinRoomModal,
        createRoomModal,
        setCreateRoomModal
    } = useMainHall()
    const navigate = useNavigate()
    let myName = 'Pawel';
    let myRooms = useSelector(state => state.rooms.rooms);
    return (
        <div className='MainHall'>
            <div className='hall-left'>
                <Avatar logout={logout}/>
                <div className='my-rooms'>
                    <div className='my-rooms-title'>Moje pokoje:</div>
                    <div className='my-rooms-list'>
                        {myRooms.map(room => {
                            return <div className={`hov ${room.rolled ? 'rolled-color' : 'unrolled-color'}`}>
                                <div onClick = {()=>{navigate(`room/${room._id}`)}}>{room.name}</div>
                            </div>
                        })}
                    </div>
                </div>
            </div>

            <div className='hall-right'>
                <div className='signpost'>
                    <div className='join-room hov' onClick={() => {
                        setJoinRoomModal(true)
                    }}>Dołącz do pokoju
                    </div>
                    <div className={'create-room hov'} onClick={() => {
                        setCreateRoomModal(true)
                    }}>Stwórz pokój
                    </div>
                </div>
            </div>
            {joinRoomModal && <RoomFormModal submit={joinRoom} type='join' hide={() => {
                setJoinRoomModal(false)
            }}/>}
            {createRoomModal && <RoomFormModal submit={createRoom} type='create' hide={() => {
                setCreateRoomModal(false)
            }}/>}
        </div>
    )
}