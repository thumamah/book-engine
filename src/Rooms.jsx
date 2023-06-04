import React from 'react'
import Navbar from './components/Navbar'
import RoomResults from './components/RoomResults';
import { useLocation } from 'react-router-dom';
export default function Rooms() {
  // using location hook to access current state object to access hotel id
  // which came from the hotel component
  // this id is used to find to rooms of the selected hotel
  const location = useLocation();
  const hotelId = location.state.hotelId;
  console.log(hotelId)
  return (
    <div>
      <Navbar />
      {/* passing the hotel id to room result component */}
      <RoomResults hotelId={hotelId}
      />
    </div>
  )
}
