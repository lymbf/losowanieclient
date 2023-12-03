import {useSelector} from "react-redux";

export default function useFetch(){
    let jwt = useSelector(state=>state.user.jwt);
    const getData = async (method, url, body)=>{

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