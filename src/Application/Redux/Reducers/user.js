const SET_USER = 'user/setUser';
const LOGOUT = 'user/logout';
const UPDATE_ROLLED_USER = 'user/updateRolledUser';
export default function User(state = {rooms: [], _id: false, name: false, loggedIn: false, jwt: null}, action){
    let data = {...state}
    switch(action.type){
        case SET_USER:
            data = {...action.payload};
            return data;
        case LOGOUT:
            localStorage.removeItem('jwt')
            data.rooms = [];
            data._id = false;
            data.name = false;
            data.loggedIn = false;
            data.jwt = null;
            return {...data}
        case UPDATE_ROLLED_USER:
            data.rooms = action.payload;
            return {...data};
        default: return state
    }
}

const setUser = (payload)=>{
    return{
        type: SET_USER,
        payload
    }
}

const updateRolledUser = (payload)=>{
    return {
        type: UPDATE_ROLLED_USER,
        payload
    }
}

const logOut = ()=>{
    return{
        type: LOGOUT
    }
}

export {setUser, logOut, updateRolledUser}