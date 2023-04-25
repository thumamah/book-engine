import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [info, setInfo] = useState('');
    const [image, setImage] = useState('');
    const [hotels, setHotels] = useState([]);
    const [shotels, ssetHotels] = useState('');
    const nav = useNavigate();

    const addHotel = async (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('location', location);
        formData.append('info', info);
        formData.append('image', image);

        try {
            console.log(formData)
            const response = await axios.post('http://localhost:3001/addHotel', formData);
            console.log(response.data);
            nav("/Admin/Dashboard")
            // handle successful registration here
        } catch (error) {
            console.error(error);
            // handle registration error here
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files)
    };

    useEffect(()=>{
    const getHotels = async () => {
        try {
            const results = await axios.get('http://localhost:3001/findAllHotel/')
            setHotels(results.data)
            console.log(results.data)
        } catch (error) {
            console.log(error)
        }
        };
        getHotels();

    },[]);
return (
    <div className='main-admin'>
        <Sidebar />
        Hello, add hotels

        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>

                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Add Rooms
                    </h2>

                </div>
                <form onSubmit={addHotel} className="mt-8 space-y-6">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">

                    <div>
                           <select name="" id="" value={shotels} onChange={(e) => ssetHotels(e.target.value)}>
                            <option value="">Select Hotel</option>
                            {hotels.map((hotel)=>(
                                <option key={hotel._id} value={hotel._id}>
                                    {hotel.name}
                                </option>
                            ))}
                           </select>
                        </div>
                        <br />

                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Number
                            </label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="Name"
                                name="Name"
                                type="text"
                                className="relative p-4 block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Number"
                            />
                        </div>
                        <br />
                        <div>
                            <label className="sr-only">
                                Price
                            </label>
                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                id="email-address"
                                name="email"
                                type="text"

                                className="relative p-4 block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Price"
                            />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Info
                            </label>
                            <input
                                onChange={(e) => setInfo(e.target.value)}
                                value={info}
                                id="password"
                                name="password"
                                type="text"
                                className="relative p-4 block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Info"
                            />
                        </div>

                        <br />
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Image Link
                            </label>
                            <input

                                type="file"
                                name="image"
                                // value={image}
                                onChange={handleImageChange}
                            />

                        </div>

                    </div>



                    <div>
                        <button
                            // onClick={addHotel}
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)
}

export default AddRoom
