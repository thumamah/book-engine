import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (


        <div className='sidebar'>
            <nav className='admin-nav'>
                <ul>
                    <NavLink to={"/Admin/Dashboard/"}>
                        <li>
                            Dashboard
                        </li>
                    </NavLink>

                    <NavLink to={"/admin/users"}>
                        <li>
                            Users
                        </li>
                    </NavLink>

                    <NavLink to={"/admin/bookings"}>
                        <li>
                            Bookings
                        </li>
                    </NavLink>

                    <NavLink to={"/Admin/AddHotels/"}>
                        <li>
                            Add Hotels
                        </li>
                    </NavLink>

                    <NavLink to={"/Admin/AddRoom"}>
                        <li>
                            Add Rooms
                        </li>
                    </NavLink>

                    <NavLink to={"/admin/settings"}>
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
