import {useDispatch, useSelector} from "react-redux";
import useFetch from "../../../../Application/Hooks/fetch";
import {setUser} from "../../../../Application/Redux/Reducers/user";
import {useNavigate} from "react-router-dom";

export default function useSignup() {
    const fields = useSelector(state => state.forms.signup);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {getData} = useFetch();
    const signup = (e) => {
        e.preventDefault();
        let url = 'auth/signup';

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
            navigate('/')
        }).catch(err => {
            console.log(err)
        }) : console.log('unable to signup')
    }

    return {signup}
}