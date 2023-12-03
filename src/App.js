
import './App.css';
import Snow from "./View/Components/Snow/snow";
import Header from "./View/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./View/Pages/MainPage";
import useInit from "./Application/init";
import Error404 from "./View/404";
import Login from "./View/Pages/Login";
import SingUp from "./View/Pages/Singup";
import Room from "./View/Pages/Room";
import {useSelector} from "react-redux";
import Loading from "./View/Components/Loading";

function App() {
    const loggedIn = useSelector(state=>state.user.loggedIn)
    const loading = useSelector(state=>state.lifecycle.loading);
    useInit()
  return (
    <div className="App">
        {loading && <Loading/>}
        <Snow/>
        <Header/>
        <BrowserRouter>
            <Routes>
                <Route path = '/' element = {<MainPage/>} />
                <Route path = '/login' element={<Login/>}/>
                <Route path = '/signup' element={<SingUp/>}/>
                <Route path = '/room/:id' element = {loggedIn ? <Room/> : <MainPage/>}/>
                <Route path = '/*' element = {<Error404/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
