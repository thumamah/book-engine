import React from 'react'
import Navbar from './components/Navbar'
import RoomResults from './components/RoomResults';
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useLocation } from 'react-router-dom';
import { SearchContext } from "./SearchContext";
import axios from "axios";
export default function Rooms() {
  const location = useLocation();
  //const Destination = location.state.Destination;
  const h = location.state.h;
  const numRooms = location.state.numRooms;
  //console.log(Destination)
  console.log(h)
  console.log(numRooms)
  //const [hotels, setHotels] = useState([]);
  //const [Destination, setDestination] = useState(loc.state.Destination);

  // useEffect(() => {
  //   const fetchHotels = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3001/findHotel/${Destination}`);
  //       setHotels(response.data);
  //       console.log()
  //       console.log(response)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchHotels();
  // }, [Destination]);
  return (
    <div>

      <Navbar />
      <RoomResults names={h}
      />
      
    </div>
  )
}
