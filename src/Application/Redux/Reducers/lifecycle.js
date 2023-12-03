const SET_FIELD = 'lifecycle/setField';
const CLEAR_FIELD = 'lifecycle/clearField';
export default function lifecycle(state = {loading: true}, action){
    let data = {...state}
    const {field, value} = action.payload || false;
    switch(action.type){
        case SET_FIELD:
            data[field] = value;
            return {...data};
        case CLEAR_FIELD:
            data[field] = false;
            return {...data}
        default: return state
    }
}

function setLifecycleField(payload){
    return{
        type: SET_FIELD,
        payload
    }
}

function clearLifecycleField(payload){
    return{
        type: CLEAR_FIELD,
        payload
    }
}

export {setLifecycleField, clearLifecycleField}