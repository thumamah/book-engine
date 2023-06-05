import React from 'react'
import './Sidebar.css'
import Sidebar from './Sidebar'
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

// component for viewing hotel room occupancy rates
const HotelAnalysis = () => {

    // checking if user is allowed to perform this action of viewing the occupancy rates
    const [cookies, setCookie] = useCookies(['role']);
    const navi = useNavigate()
    if (cookies.role === "admin") {
        console.log("good")
    }
    else {
        navi('../')
        console.log("bad")
    }

    // use state hooks to save related data such as date, hotels, hotel id and occupancy rates
    const [date, setDate] = useState(new Date());
    const [hotels, setHotels] = useState([]);
    const [hotelId, sethotelId] = useState('');
    const [occupancyRate, setOccupancyRate] = useState([]);

    // in order to view the occupancy rate all hotels will be fetched
    // to allow admin to choose from
    // used use effect to rerun this function every time hotel id changes
    useEffect(() => {
        const getHotels = async () => {
            try {
                const results = await axios.get('http://localhost:3001/findAllHotel/')
                setHotels(results.data)
                console.log(results.data)
                console.log(hotelId)
            } catch (error) {
                console.log(error)
            }
        };
        getHotels();

    }, [hotelId]);

    // function to fetch the occupoancy rates form the occupancy model
    const OccupancyRatesFunction = async (e) => {
        e.preventDefault();
        // setting the date such that admin can view occupancy rate of the full day
        const formattedDate = date.toISOString().split("T")[0];
        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0); 
        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999); 

        console.log(formattedDate)
        try {
            // making request to occupancy rate endpoint to fetch data according to dates and hotel
            const response = await axios.get(`http://localhost:3001/rate/${hotelId}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
            setOccupancyRate(response.data)
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    };

    console.log(occupancyRate)

    // defining the graph data set
    const userData = {
        // iterating over the ocucpancy records and displaying them in graph
        labels: occupancyRate.map((data) => data.date),
        datasets: [
            {
                label: "Occupancy Rate",
                data: occupancyRate.map((data) => data.occupancyRate),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    };
    return (
        // form for admin to select hotel and a date
        <div className='main-admin'>
            <Sidebar />
            Hello, welcome to Hotel analysis new

            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>

                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Hotel Analysis
                        </h2>

                    </div>
                    <form onSubmit={OccupancyRatesFunction} className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">

                            <div className="bookItems">
                                {/* <FontAwesomeIcon icon={faCalendarDays} className='icon' /> */}
                                {/* displaying the selected date by the user */}
                                <DatePicker
                                    selected={date}
                                    onChange={date => setDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    className='dates'
                                />
                            </div>
                            <br />
                            <div>
                                <select name="" id="" value={hotelId} onChange={(e) => sethotelId(e.target.value)}>
                                    <option value="">Select Hotel</option>
                                    {hotels.map((hotel) => (
                                        <option key={hotel._doc._id} value={hotel._doc._id} onChange={(e) => sethotelId(e.target.value)}>
                                            {hotel._doc.name} - {hotel._doc.location}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <br /><br />
                        </div>



                        <div>
                            <button

                                type="submit"
                                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                See Occupancy Rates
                            </button>
                        </div>
                    </form>

                    <div style={{ width: 800 }}>
                        <Bar data={userData} />
                    </div>
                </div>
            </div>
        </div>

    )

}

export default HotelAnalysis