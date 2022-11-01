import React, { useState } from "react";
import login from "../services/login";

export const LoginForm = ({handleUserLogin}:{handleUserLogin: (user:{token:string,username:string}) => void}) => {
    const [inputValues, setInputValues] = useState({ username: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event:React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const response = await login(inputValues);
            handleUserLogin(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="loginForm" onSubmit={(e) => handleLogin(e)}>
            <div>Username:
                <input className="inputForm" type="text" name="username" onChange={(e) => handleChange(e)} />
            </div>
            <div>
                Password:
                <input className="inputForm" type="text" name="password" onChange={(e) => handleChange(e)} />
            </div>
            <div className="buttonsForm">
                <button>Login</button>
            </div>
        </form>
    );
};