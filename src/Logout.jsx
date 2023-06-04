import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const nav = useNavigate();
    const { user, login, logout } = useContext(UserContext);
    console.log(user)
    const logout_fun = async () => {
        try {
            await axios.post('http://localhost:3001/logout');
            logout();
            nav("/")
        } catch (error) {
            console.error(error.message);
        }
    };
    logout_fun();

    return (
        <div>

        </div>
    )
}

export default Logout
