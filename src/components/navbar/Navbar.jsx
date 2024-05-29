import React, { useState } from "react";
import "./navbar.css";
import Logo from "../../assets/img/navbar-logo.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";

const Navbar = () => {
    const [menuActive, setMenuActive] = useState(false);
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

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
                <div className={`navbar-wrap`}>
                    <ul className={`navbar-menu ${menuActive ? 'active' : ''}`}>
                        {!isAuth && (
                            <li>
                                <NavLink to="/login" onClick={toggleMenu}>Вход</NavLink>
                            </li>
                        )}
                        {!isAuth && (
                            <li>
                                <NavLink to="/registration" onClick={toggleMenu}>Регистрация</NavLink>
                            </li>
                        )}
                        {isAuth && (
                            <li>
                                <a href="" onClick={() => { dispatch(logout()); toggleMenu(); }}>
                                    Выход
                                </a>
                            </li>
                        )}
                    </ul>
                    <div className="navbar-toggle" onClick={toggleMenu}>
                        &#9776;
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
