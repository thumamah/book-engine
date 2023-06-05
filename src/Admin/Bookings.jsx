import React from 'react'
import Sidebar from './Sidebar';
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

// component to see all bookings
const Bookings = () => {

    // checking if user is allowed to view all bookings
    const [cookies, setCookie] = useCookies(['role']);
    const navi = useNavigate()
    if (cookies.role === "admin") {
        console.log("good")
    }
    else {
        navi('../')
        console.log("bad")
    }
    // use state to hold all bookings
    const [bookings, setBookings] = useState([]);

    // use effect to make requests to get all bookings
    useEffect(() => {

        axios.get('http://localhost:3001/findAllBookings/').then((response) => {
            setBookings(response.data.bookings);
            console.log(response.data.bookings)
        });

    }, []);

    // using table to view bookings
    return (
        <div className='main-admin'>
            <Sidebar />
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Hotel
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Room
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Check In
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Check Out
                                        </th>


                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {bookings.map((booked) => (


                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                {booked._id}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {booked.hotelName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {booked.roomId}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <a
                                                    className="text-green-500 hover:text-green-700"
                                                    href="#"
                                                >
                                                    {new Date(booked.startDate).toLocaleDateString()}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <a
                                                    className="text-red-500 hover:text-red-700"
                                                    href="#"
                                                >
                                                    {new Date(booked.endDate).toLocaleDateString()}
                                                </a>
                                            </td>


                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bookings
