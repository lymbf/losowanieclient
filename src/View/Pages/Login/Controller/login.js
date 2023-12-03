import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../../Application/Redux/Reducers/user";
import {useNavigate} from "react-router-dom";
import useFetch from "../../../../Application/Hooks/fetch";
import {setError} from "../../../../Application/Redux/Reducers/errors";

export default function useLogin() {
    const fields = useSelector(state => state.forms.login)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {getData} = useFetch();
    const login = (e) => {
        e.preventDefault();
        let url = 'auth/login';
        (fields.name && fields.password) ? getData('POST', url, {
            name: fields.name,
            password: fields.password
        }).then(res => {
            dispatch(setUser({
                name: res.user.name,
                _id: res.user._id,
                rooms: res.user.rooms,
                loggedIn: true,
                jwt: res.jwt
            }))
            localStorage.setItem('jwt', res.jwt)
            navigate('/')
        }).catch(err => {
            dispatch(setError({type: 'forms', field: 'login', value: err.message}))
        }) : console.log('incorrect name or password')
    }
    return {login}
}