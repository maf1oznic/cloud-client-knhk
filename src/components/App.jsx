import React, {useEffect} from "react";
import Navbar from "./navbar/Navbar.jsx";
import "./app.css";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Registration from "./authorization/Registration.jsx";
import Login from "./authorization/Login.jsx";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user";
import Disk from "./disk/Disk";
function App() {


    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])


    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                {!isAuth ?
                        <Routes>
                            <Route path="/registration" element={<Registration />}/>
                            <Route path="/login" element={<Login />}/>
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </Routes>
                        :
                        <Routes>
                            <Route exact path="/" element={<Disk />}/>
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    }
            </div>
        </BrowserRouter>
    );
}

export default App;
