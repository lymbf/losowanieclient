const SET_FIELD = 'forms/setField';
const CLEAR_FIELD = 'forms/clearField';
const CLEAR_FORM = 'forms/clearForm';
export default function forms(state = {
    login: {name: false, password: false},
    signup: {name: false, password: false},
    room_form: {room_name: false}
}, action) {
    const {form, field, value} = action.payload || false
    let data = {...state};
    switch (action.type) {
        case SET_FIELD:
            data[form][field] = value;
            return {...data}
        case CLEAR_FORM:
            for(const [key, value] of Object.entries(data[form])){
                data[form][key] = false;
            }
            return {...data}
        case CLEAR_FIELD:
            data[form][field] = false;
            return {...data}
        default:
            return state
    }
}

function setField(payload) {
    return {
        type: SET_FIELD,
        payload: payload
    }
}

function clearForm(){
    return{
        type: CLEAR_FORM
    }
}

function clearField(payload){
    return{
        type: CLEAR_FIELD,
        payload
    }
}

export {setField, clearForm, clearField}