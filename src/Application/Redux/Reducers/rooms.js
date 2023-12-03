const SET_ROOMS = 'rooms/setRooms';
const SET_CURRENT_ROOM = 'rooms/setCurrentRoom';
const CLEAR_CURRENT_ROOM = 'rooms/clearCurrentRoom';
const CLEAR_ROOMS = 'rooms/cclearRooms';
export default function rooms(state = {rooms: [], currentRoom: false}, action){
    let data = {...state}
    switch(action.type){
        case SET_ROOMS:
            data.rooms = action.payload;
            return {...data};
        case CLEAR_ROOMS:
            data.rooms = [];
            return {...data};
        case SET_CURRENT_ROOM:
            data.currentRoom = action.payload;
            return {...data};
        case CLEAR_CURRENT_ROOM:
            data.currentRoom = false;
            return {...data};
        default: return state
    }
}

const setRooms = (payload)=>{
    return{
        type: SET_ROOMS,
        payload
    }
}

const setCurrentRoom = (payload)=>{
    return{
        type: SET_CURRENT_ROOM,
        payload
    }
}

const clearRooms = ()=>{
    return{
        type: CLEAR_ROOMS
    }
}

const clearCurrentRoom = ()=>{
    return{
        type: CLEAR_CURRENT_ROOM
    }
}


export {setRooms, setCurrentRoom, clearCurrentRoom, clearRooms}