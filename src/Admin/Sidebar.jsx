import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom';

// component for adding the sidebar in admin portal
const Sidebar = () => {
    return (


        // adding appropiate links
        <div className='sidebar'>
            <nav className='admin-nav'>
                <ul>
                    <NavLink to={"/Admin/Dashboard"}>
                        <li>
                            Dashboard
                        </li>
                    </NavLink>



                    <NavLink to={"/Admin/Bookings"}>
                        <li>
                            Bookings
                        </li>
                    </NavLink>

                    <NavLink to={"/Admin/AddHotels"}>
                        <li>
                            Add Hotels
                        </li>
                    </NavLink>

                    <NavLink to={"/Admin/AddRoom"}>
                        <li>
                            Add Rooms
                        </li>
                    </NavLink>

                    <NavLink to={"/Admin/HotelAnalysis"}>
                        <li>
                            Hotel Analysis
                        </li>
                    </NavLink>

                    <NavLink to={"/"}>
                        <li>
                            User Portal
                        </li>
                    </NavLink>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
