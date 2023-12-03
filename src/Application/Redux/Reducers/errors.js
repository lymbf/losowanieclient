const SET_ERROR = 'errors/setError';
const CLEAR_ERROR = 'errors/clearError';
export default function Errors(state = {
    inputs: {name: false, password: false},
    forms: {login: false, signup: false, room: false},
    room: {fetch: false, leave: false, removeUser: false, roll: false, unroll: false}
}, action) {
    let data = {...state}
    let {type, field, value} = action.payload ? action.payload : false
    switch (action.type) {
        case SET_ERROR:
            data[type][field] = value;
            return {...data}
        case CLEAR_ERROR:
            data[type][field] = false;
            return {...data}
        default:
            return state
    }
}

function setError(payload) {
    return {
        type: SET_ERROR,
        payload: payload
    }
}

function clearError(payload){
    return{
        type: CLEAR_ERROR,
        payload: payload
    }
}

export {setError, clearError}