import Footer from './Footer';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';

// this component fetches hotel based users search
const HotelResults = (props) => {


  console.log(props)
  const navi = useNavigate()
  // to access current location object
  const loc = useLocation();

  // accessing the user searched info from the current state using location hook
  const Destination = loc.state.Destination
  const numRooms = loc.state.numRooms
  const numAdults = loc.state.numAdults
  const numChildren = loc.state.numChildren
  const date = loc.state.date

  // testing
  console.log(Destination)
  console.log(numRooms)
  console.log(numAdults)
  console.log(numChildren)
  console.log((date[0].endDate - date[0].startDate) - 86400000)

  // use state hook to save hotels data
  // initially set as an empty array
  const [hotels, setHotels] = useState([]);

  // use effect hook to make request to the find hotel endpoint and update all search values
  // to avoid having to search for results again and get live instant hotel results.
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/findHotel/${props.name.Destination}`);
        setHotels(response.data);
        console.log(response.data)
        console.log(props.name)
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotels();
  }, [props.name.Destination, props.name.numRooms, props.name.numAdults, props.name.numRoom, props.name.date]);


  console.log(hotels.length)

  // function which direct user to room results page with search data for price calculation
  // also the hotel id and name passed.
  const search = (hotelId, name) => {
    console.log(hotelId)
    navi("../Rooms", { state: { Destination, hotelId, numRooms: props.name.numRooms, numAdults: props.name.numAdults, numChildren: props.name.numChildren, date: props.name.date, name } });
  }
  console.log(search)

  return (
    // hotels are displayed using a grid structure from bootstrap and tailwind css
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Hotels in {props.name.Destination} : {hotels.length} Properties Found</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-1 xl:gap-x-8">
          {/* 
          used map function to iterate over all hotels and setting the values 
          */}
          {hotels.map((hotel) => (
            <>
              <div key={hotel._id} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={hotel.image}
                    alt={hotel.image}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>

                    <h3 className="text-sm text-gray-700">

                      <span aria-hidden="true" className="absolute inset-0" />
                      {hotel.name}

                    </h3>

                    <p className="mt-1 text-sm text-gray-500">{hotel._id}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{hotel.location}</p>
                </div>

              </div>
              {/* passing hotel id and name to the search function to pass it to the room component
                  to help in retrieving rooms of the selected hotel */}
              <button onClick={() => search(hotel._id, hotel.name)} class="bg-orange-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-1">
                Check Room Availability
              </button>
            </>
          ))}

        </div>

      </div>
      <Footer />
    </div>
  )
}
export default HotelResults
