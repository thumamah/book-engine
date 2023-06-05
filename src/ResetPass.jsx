import React from 'react'
import Navbar from './components/Navbar'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import img_logo from './components/log.png';
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';

// reset password component
export default function ResetPass() {

    // use state hook to save user password and token and error and succes messages
    const [password, setPassword] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState('');

    const location = useLocation();
    const nav = useNavigate();

    // use effect hook to extract reset token from url using the url search param function
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const reset = searchParams.get('token');
        setResetToken(reset)
    }, [location]);

    // function to make requests to change password endpoint with sending new password and reset token to verify them
    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/changePass', { password, resetToken });
            console.log(response.data);
            setSuccess(response.data.message)

        } catch (error) {
            console.error(error);
            setErrors(error.response.data.message)
        }
    };
    return (
        // reset password form
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
                            Reset your password
                        </h2>

                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="email-address"
                                    name="email"
                                    type="password"
                                    autoComplete="email"
                                    required
                                    className="relative p-4 block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Password"
                                />
                            </div>
                            <br />

                        </div>

                        <div className="flex items-center font-bold text-blue-400 justify-between">
                            {errors || success}
                        </div>


                        <div>
                            <button
                                onClick={handleReset}
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
