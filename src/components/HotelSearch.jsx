import React from 'react';
import './HotelSearch.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useState } from "react";
import { format, addDays } from 'date-fns';
import {
    faBed,
    faCalendarDays,
    faPerson
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation, useNavigate } from 'react-router-dom';
import HotelResults from './HotelResults';

const HotelSearch = () => {
    
    // used react useState hook to remeber is the date model is open or not
    // by default it'll be closed.
    const [openDate, setOpenDate] = useState(false)
    // storing users selected date using react date range library
    // const [date, setDate] = useState([
    //     {
    //         // start date is the current date
    //         startDate: new Date(),
    //         // end date is 1 day after start
    //         endDate: addDays(new Date(), 1),
    //         key: 'selection'
    //     }
    // ]);

    const loc = useLocation();
    // using react useState hook to store users selected room, adults and children
    // by default room and adult is defined as 1, children has been as 0.
    const [numRooms, setNumRooms] = useState(loc.state.numRooms);
    const [numAdults, setNumAdults] = useState(loc.state.numAdults);
    const [numChildren, setNumChildren] = useState(loc.state.numChildren);

    const [date, setDate] = useState(loc.state.date);
    const [Destination, setDestination] = useState(loc.state.Destination);
    

    // event handlers to update the state whenever the user changes value
    const handleNumRoomsChange = (event) => {
        setNumRooms(parseInt(event.target.value));
    };

    const handleNumAdultsChange = (event) => {
        setNumAdults(parseInt(event.target.value));
    };

    const handleNumChildrenChange = (event) => {
        setNumChildren(parseInt(event.target.value));
    };

    const navi = useNavigate()
    const searchFunc = ()=>{
        const searchParams = {
            destination: Destination,
            startDate: date[0].startDate.toISOString(),
            endDate: date[0].endDate.toISOString(),
            numRooms,
            numAdults,
            numChildren,
          };
          
          navi("../Hotels", { state: searchParams });
    }


    return (

        <div className="head">
            
                
                <div className='Hsearch'>
                    <div className="bookItems">
                        {/* used font awesome icons */}
                        <FontAwesomeIcon icon={faBed} className='icon' />
                        {/* input for field for searching hotels */}
                        <input
                            type="text"
                            placeholder={Destination}
                            className="headerSearchInput"
                        />
                    </div>
                    {/* date selection */}
                    <div className="bookItems">
                        <FontAwesomeIcon icon={faCalendarDays} className='icon' />
                        {/* displaying the selected dates by the user 
                        enabling the user to open date model if its closed
                        also formatting the date in the day, month, year format.
                        */}
                        <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
                        {/* adding a condition to ensure date model is closed on page reload and first visit */}
                        {openDate && <DateRange
                            onChange={item => setDate([item.selection])}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            minDate={new Date()}
                            months={1}
                            ranges={date}
                            className='dates'
                        />}
                    </div>

                    {/* following are the options for selecting rooms and guests*/}
                    <div className="bookItems">
                        <FontAwesomeIcon icon={faPerson} className='icon' />
                        {/* used select element so user can choose value form 1-10
                            using value to determine current selected value and onChange
                            which calls the handler when user changes selected value.
                        */}
                        <span>Rooms:<select value={numRooms} onChange={handleNumRoomsChange}>
                            {/* used the array spread operator to create array to hold values
                                then used map function to create array of options
                            */}
                            {[...Array(10)].map((_, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                            Adults:
                            <select value={numAdults} onChange={handleNumAdultsChange}>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            Children:
                            <select value={numChildren} onChange={handleNumChildrenChange}>
                                {[...Array(6)].map((_, i) => (
                                    <option key={i} value={i}>
                                        {i}
                                    </option>
                                ))}
                            </select></span>
                    </div>

                    {/* button to search for results */}
                    <div className="bookItems">
                        <button onClick={searchFunc} class="bg-orange-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-1">
                            Search
                        </button>
                    </div>
                </div>

            <HotelResults/>
        </div>


    )

}

export default HotelSearch
