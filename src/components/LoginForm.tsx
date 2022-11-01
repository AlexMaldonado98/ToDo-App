import React, { useState } from "react";
import login from "../services/login";
import userServices from '../services/user';

export const LoginForm = ({handleUserLogin, notif}:{handleUserLogin: (user:{token:string,username:string}) => void,notif:(e:string) => void}) => {
    const [inputValues, setInputValues] = useState({ username: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event:React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const response = await login(inputValues);
            handleUserLogin(response);
        } catch (error:any) {
            notif(`[ERROR] ${error.response.data.error}`);
        }
    };

    const handleCreateUser = async () => {
        try {
            const response = await userServices.createUser(inputValues);
            if(response.username){
                notif('User created');
            }
        } catch (error:any) {
            notif(`[ERROR] ${error.response.data.error}`);
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
                <button type="button" onClick={() => handleCreateUser()} >Create user</button>
                <button>Login</button>
            </div>
        </form>
    );
};