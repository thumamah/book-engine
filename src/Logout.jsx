import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// logout component
const Logout = () => {

    // used navigate hook to redirect user after logout
    const nav = useNavigate();
    // using context api to call the logout function to clear all cookies and local storage
    const { user, login, logout } = useContext(UserContext);
    console.log(user)
    // function to make request to logout endpoint
    const logout_fun = async () => {
        try {
            await axios.post('http://localhost:3001/logout');
            logout();
            nav("/")
        } catch (error) {
            console.error(error.message);
        }
    };
    // calling the logout function
    logout_fun();

    return (
        <div>

        </div>
    )
}

export default Logout
