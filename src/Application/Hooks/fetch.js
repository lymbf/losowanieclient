import {useDispatch, useSelector} from "react-redux";
import {clearLifecycleField, setLifecycleField} from "../Redux/Reducers/lifecycle";

export default function useFetch(){
    let jwt = localStorage.getItem('jwt')
    const dispatch = useDispatch();
    const loading = useSelector(state=>state.lifecycle.loading)


    const getData = async (method, url, body)=>{
        let t = 200;
        console.log('url: ', url)
        if(url.includes('room/')) t = 800;
        if(!loading) {
            dispatch(setLifecycleField({field: 'loading', value: true}));
            setTimeout(()=>{dispatch(clearLifecycleField({field: 'loading'}))}, t)
        }

        let data = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            }
        })
        data = await data.json();

        if(data.error){
            console.log('message: ', data.message)
            throw new Error(data.message)
        }else{
            return data
        }
    }
    return {getData}
}