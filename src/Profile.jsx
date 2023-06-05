import React from 'react'
import Navbar from './components/Navbar'
import { useEffect, useState } from "react";
import axios from "axios";

// profile component
export default function Profile() {

    // use state hook to save all bookings
    // initially its an empty array
    const [bookings, setBookings] = useState([]);

    // function to send requests to delete booking to delete the future bookings
    const handleBookingDelete = async (bookId, endDate) => {
        console.log(bookId)
        try {
            const response = await axios.post('http://localhost:3001/deleteBooking', { bookId, endDate });
            console.log(response.data);
            // updating the booking state by removing the booking that has just been deleted
            // check which booking has been deleted and removes that.
            setBookings((Bookings) => Bookings.filter((booked) => booked._id !== bookId));
            
        } catch (error) {
            console.error(error);
            
        }
    };

    useEffect(() => {
        // making request to fetch bookings for the logged in user
        // user id is extracted from local storage
        axios.get(`http://localhost:3001/findBooking/${localStorage.getItem('id')}`).then((response) => {
            setBookings(response.data.bookings);
            console.log(response.data.bookings)
        });

    }, [localStorage.getItem('id')]);
    return (
        // used tailwind css table to display all the bookings
        <div>
            <Navbar />
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
                                            Price
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

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                        >
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                {/* iterating over all bookings */}
                                <tbody className="divide-y divide-gray-200">
                                    {bookings.map((booked) => (


                                        // <tr>
                                        //     <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        //         {booked._id}
                                        //         {setBookId(booked._id)}
                                        //     </td>
                                        //     <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        //         Jone Doe
                                        //     </td>
                                        //     <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        //         jonne62@gmail.com
                                        //     </td>
                                        //     <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        //         <a
                                        //             className="text-green-500 hover:text-green-700"
                                        //             href="#"
                                        //         >
                                        //             {new Date(booked.startDate).toLocaleDateString()}
                                        //         </a>
                                        //     </td>
                                        //     <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        //         <a
                                        //             className="text-red-500 hover:text-red-700"
                                        //             href="#"
                                        //         >
                                        //             {new Date(booked.endDate).toLocaleDateString()}
                                        //         </a>
                                        //     </td>

                                        //     <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        //         <button
                                        //             onClick={handleBookingDelete}
                                        //             type="submit"
                                        //             className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        //         >
                                        //         </button>
                                        //     </td>
                                        // </tr>
                                        <tr key={booked._id}>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                {booked._id}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {booked.hotelName}
                                            
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {booked.totalPrice}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <a className="text-green-500 hover:text-green-700" href="#">
                                                    {new Date(booked.startDate).toLocaleDateString()}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <a className="text-red-500 hover:text-red-700" href="#">
                                                    {new Date(booked.endDate).toLocaleDateString()}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => handleBookingDelete(booked._id, booked.endDate)} // Move setBookId outside the loop
                                                    type="submit"
                                                    className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Delete
                                                </button>
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
