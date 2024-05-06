import React, {useState} from 'react';
import './authorization.css'
import {registration} from "../../actions/user";
import Input from "../../utils/input/Input";

const Registration = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault(); // Предотвращение стандартного поведения формы

        try {
            await registration(username, email, password);
        } catch (error) {
            console.error("Ошибка регистрации:", error);
        }
    };

    return (
        <div className="container-authorization">
            <div className="container-form">
                <form className="authorization-form" onSubmit={handleSubmit}>
                    <h2>Регистрация</h2>
                    <label for="username">Имя пользователя:</label>
                    <Input type="text" value={username} setValue={setUsername} required/>
                
                    <label for="email">Электронная почта:</label>
                    <Input value={email} setValue={setEmail} type="email" required/>
                
                    <label for="password">Пароль:</label>
                    <Input value={password} setValue={setPassword} type="password" required/>
                
                    <button type="submit">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;