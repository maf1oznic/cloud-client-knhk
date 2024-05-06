import React from "react";
import "./navbar.css";
import Logo from "../../assets/img/navbar-logo.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";

const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-header">
                    <a href="/">
                        <img className="logo" src={Logo} alt="logo" />
                    </a>
                    <a href="../../../" className="navbar-brand">
                        Облако КНХК
                    </a>
                </div>
                <div className="navbar-wrap">
                    <ul className="navbar-menu">
                        {!isAuth && (
                            <li>
                                <a href="">
                                    <NavLink to="/login">Вход</NavLink>
                                </a>
                            </li>
                        )}
                        {!isAuth && (
                            <li>
                                <a href="">
                                    <NavLink to="/registration">
                                        Регистрация
                                    </NavLink>
                                </a>
                            </li>
                        )}
                        {isAuth && (
                            <li>
                                <a href="" onClick={() => dispatch(logout())}>
                                    Выход
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
