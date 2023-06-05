import React from 'react'
import Navbar from './components/Navbar'
import HotelSearch from './components/HotelSearch';


// hotel page which has navbar and hotel search components
export default function Hotels() {

  return (
    <div>
      <Navbar/>
      <HotelSearch/>
    </div>
  )
}
