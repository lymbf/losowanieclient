import useAuth from "./Modules/auth";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {clearLifecycleField, setLifecycleField} from "./Redux/Reducers/lifecycle";

export default function useInit(){
    useAuth()
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(()=>{dispatch(clearLifecycleField({field: 'loading'}))}, 200)
    }, []);
}