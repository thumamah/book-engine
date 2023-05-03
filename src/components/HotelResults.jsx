import burj1 from './burj1.jpg';
import Footer from './Footer';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import RoomResults from './RoomResults';
import { useLocation, useNavigate } from 'react-router-dom';

const HotelResults = (props) => {

  const navi = useNavigate()
  const loc = useLocation();

  const [Destination, setDestination] = useState(loc.state.Destination);
  const [numRooms, setNumRooms] = useState(loc.state.numRooms);
  const [numAdults, setNumAdults] = useState(loc.state.numAdults);
  const [numChildren, setNumChildren] = useState(loc.state.numChildren);
  const [date, setDate] = useState(loc.state.date);
  console.log(Destination)
  console.log(numRooms)
  console.log(numAdults)
  console.log(numChildren)
  console.log((date[0].endDate-date[0].startDate)-86400000)

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/findHotel/${props.name}`);
        setHotels(response.data);
        console.log(response.data)
        console.log(props.name)
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotels();
  }, []);
  console.log(hotels.length)
  const search = (h, name) => {
    console.log(h)
    navi("../Rooms", { state: { Destination, h, numRooms, numAdults, numChildren, date, name } });
  }
  console.log(search)

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Hotels in {Destination} : {hotels.length} Properties Found</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-1 xl:gap-x-8">
          {hotels.map((product) => (
            <>
              <div key={product._id} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.image}
                    alt={product.image}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    {/* <Link to={{ pathname: "../Rooms", state: { Destination } }}> */}
                    <h3 className="text-sm text-gray-700">


                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}


                    </h3>
                    {/* </Link> */}

                    <p className="mt-1 text-sm text-gray-500">{product._id}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.location}</p>
                </div>

                {/* <button onClick={() => search(product)} class="bg-orange-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-1">
                  Searchs
                </button> */}

              </div>

              <button onClick={() => search(product._id, product.name)} class="bg-orange-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-1">
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
