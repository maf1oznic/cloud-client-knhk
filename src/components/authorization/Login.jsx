import React, {useState} from 'react';
import './authorization.css'
import Input from "../../utils/input/Input";
import {useDispatch} from "react-redux"
import {login} from "../../actions/user";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault(); // Предотвращение стандартного поведения формы

        try {
            await dispatch(login(email, password));
        } catch (error) {
            console.error("Ошибка входа:", error);
        }
    };

    return (
        <div className="container-authorization">
            <div className="container-form">
                <form className="authorization-form" onSubmit={handleSubmit}>
                    <h2>Вход</h2>
                
                    <label for="email">Электронная почта:</label>
                    <Input value={email} setValue={setEmail} type="email" required/>
                
                    <label for="password">Пароль:</label>
                    <Input value={password} setValue={setPassword} type="password" required/>
                
                    <button type="submit">Войти</button>
                </form>
            </div>
        </div>
    );
};

export default Login;