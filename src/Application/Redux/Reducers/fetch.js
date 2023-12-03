const SET_FETCH = 'fetch/setFetch';
export default function fetch(state = {room: false, rolledUser: false}, action){
    let data = {...state}
    const {field, value} = action.payload || false
    switch(action.type){
        case SET_FETCH:
            console.log('fetching..: ', field)
            data[field] = value;
            return {...data}
        default: return state
    }
}

const setFetch = (payload)=>{
    return{
        type: SET_FETCH,
        payload: payload
    }
}

export {setFetch}