import {combineReducers} from "redux";
import errors from './Reducers/errors'
import user from './Reducers/user';
import forms from "./Reducers/forms";
import rooms from "./Reducers/rooms";
import fetch from "./Reducers/fetch";
import lifecycle from "./Reducers/lifecycle";
export default combineReducers({errors, user, forms, rooms, fetch, lifecycle})