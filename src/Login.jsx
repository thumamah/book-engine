import React from 'react'
import Navbar from './components/Navbar'
import axios from 'axios'
import { useState, useContext } from "react";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import img_logo from './components/log.png';
import { useNavigate, NavLink } from 'react-router-dom';
import { UserContext } from './UserContext';

// component for login
export default function Login() {
    // use context API
    const { user, login } = useContext(UserContext);
    const nav = useNavigate();

    // use state to save user provide details and errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');


    // function that makes requests to login endpoint
    // and passing the user email and password
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password },
            );
            console.log(response);
            console.log(response.data.message);
            console.log(response.data.role)
            login(email, password);
            console.log(email, password);
            // if its admin then redirect it to the admin portal else home
            if (response.data.role === "admin") {
                nav("/Admin/Dashboard")
            }
            else {
                nav("/")
            }

        } catch (error) {

            console.error("error");
            console.log(email)
            console.error(error.response.data.message);
            // setting the errors
            setErrors(error.response.data.message)
        }

    }
    return (
        // displaying the login form using tailwind css
        <div>
            <Navbar />
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src={img_logo}
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>

                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative p-4 block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Email address"
                                />
                            </div>
                            <br />
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input

                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative p-4 block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center font-bold text-red-400 justify-between">

                            {errors}

                        </div>

                        <div className="flex items-center text-blue-900 justify-between">

                            <div className="text-sm">
                                <NavLink
                                    key={"forgot"}
                                    to={"../forgot"}>
                                    Forgot Password?
                                </NavLink>
                            </div>
                        </div>

                        <div>
                            <button

                                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
