import burj1 from './burj1.jpg';
import Footer from './Footer';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// to display the available rooms
const RoomResults = (props) => {
    const loc = useLocation();

    // accessing cookies to check for user token
    const [cookies, setCookie] = useCookies(['token']);

    // using the location hook, we access the 
    // current state objectfor info that comes from the hotel component
    // this info is used to calculate total cost of room
    const name = loc.state.name
    const numRooms = loc.state.numRooms
    const numAdults = loc.state.numAdults
    const numChildren = loc.state.numChildren
    const date = loc.state.date

    console.log(name)

    // checking how many days user will stay
    const timeDifference = Math.abs(date[0].endDate.getTime() - date[0].startDate.getTime());
    // converting ms to actual days 
    const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    console.log(date)

    // use state hook to save room details
    const [rooms, setRooms] = useState([]);
    console.log(props.hotelId)

    // use effect in which requests are made to the find room endpoint to fetch all rooms
    // of the selected hotel
    // used hotel id form the props to pass in as a parameter in route
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                console.log(props.names)
                const response = await axios.get(`http://localhost:3001/findRoom/${props.hotelId}?startDate=${date[0].startDate}&endDate=${date[0].endDate}`);
                setRooms(response.data.roomsWithImages);
                console.log(response.data)
                console.log(rooms)
            } catch (error) {
                console.error(error);
            }
        };
        //call this method to run
        fetchRooms();
        // passing in hotel id so whenever it changes, the function runs again.
    }, [props.hotelId]);

    // naviate hook
    const navi = useNavigate()

    // reservation function passing room id and price
    const reserve = async (roomId, price) => {
        // can only reserve if user is logged in
        if (!cookies.token) {
            navi('../login')
        }
        else {
            // preparing data to be sent to the server for reservation
            const rdata = {
                roomId: roomId,
                startDate: date[0].startDate,
                endDate: date[0].endDate,
                numAdults: numAdults,
                id: localStorage.getItem('id'),
                totalPrice: price,
                email: localStorage.getItem('user'),
                hotelName: name,
                HotelId: props.hotelId

            }

            console.log(rdata)
            console.log(cookies.token)

            // making the request to the reservation endpoint
            // and passing the data with it.
            try {
                const response = await axios.post(`http://localhost:3001/reserve/${roomId}`, rdata, {
                    // headers to allow cookies and sending the auth token
                    headers: {
                        'Content-Type': 'application/json',
                        'withCredentials': true,
                        'x-auth-token': cookies.token
                    },


                });
                console.log(response)
                navi('../Confirmation');

            } catch (error) {
                console.log(roomId)
                console.error('Reservation failed:', error);

            }
        }

    }

    return (
        // displaying rooms using grid structure
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Rooms</h2>

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8">
                    {/* 
                        iterating over each room and calculating its price according to the user
                        search results
                    */}
                    {rooms.map((room) => {
                        // the base price is defined
                        const normalPrice = room.price * numRooms * totalDays;
                        // calculating extra adults by subtracting current adults
                        const extraAdults = numAdults - 2;
                        // if extra adults, then 30 extra fee
                        const extraAdultFee = extraAdults > 0 ? 30 * extraAdults * totalDays : 0;
                        // 10 extra fee for child
                        const extraChildFee = 10 * numChildren * totalDays;
                        // total cost
                        const totalPrice = normalPrice + extraAdultFee + extraChildFee;
                        return (
                            <div key={room._id} className="group relative">

                                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                                    <img
                                        src={room.image}
                                        alt={room.image}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>

                                        <h3 className="mt-1 font-bold text-black-900">{room.info} Room</h3>
                                        <h3 className="mt-1 font-bold text-black-900">
                                            {`€${totalPrice.toFixed(2)} for ${totalDays} nights`}
                                        </h3>
                                        {/* paasing in room id and price to send to the reserve function */}
                                        <button onClick={() => reserve(room._id, totalPrice)} class="mt-1 bg-orange-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-1">
                                            Reserve Room
                                        </button>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{room.location}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default RoomResults;
