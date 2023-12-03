import useFetch from "../Hooks/fetch";

import {jwtDecode} from "jwt-decode";
import {useDispatch} from "react-redux";
import {setUser} from "../Redux/Reducers/user";
import {useEffect} from "react";

export default function useAuth() {
    const jwt = localStorage.getItem('jwt');
    const {getData} = useFetch();
    const dispatch = useDispatch();
    useEffect(() => {
        if(jwt){
            const userId = jwtDecode(jwt)._id
            getData('GET', `user?id=${userId}`).then(r => {
                dispatch(setUser({
                    name: r.name,
                    _id: r._id,
                    rooms: r.rooms,
                    loggedIn: true,
                    jwt: r.jwt
                }))
            }).catch(err=>{
                console.log('error refreshing user: ', err.message)
            })
        }
    }, []);

}