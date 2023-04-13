import burj1 from './burj1.jpg';
import Footer from './Footer';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

const RoomResults = (props) => {
    const loc = useLocation();

    const [Destination, setDestination] = useState(loc.state.numRooms);
    console.log(Destination)
    const [hotels, setHotels] = useState([]);
    console.log(props.names)

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                console.log(props.names)
                const response = await axios.get(`http://localhost:3001/findRoom/${props.names}`);
                setHotels(response.data);
                console.log(response.data)
                console.log(props.names)
            } catch (error) {
                console.error(error);
            }
        };

        fetchHotels();
    }, [props.names]);
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Rooms</h2>

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8">
                    {hotels.map((product) => (
                        <div key={product._id} className="group relative">

                            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h4 className="text-sm text-gray-900">
                                        <a href={product._id}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </a>
                                    </h4>
                                    <h3 className="mt-1 font-bold text-black-900">{product.info} Room</h3>
                                    <h3 className="mt-1 font-bold text-black-900">€{product.price} per Night</h3>
                                    <button class="mt-1 bg-orange-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-1">
                                        Reserve Room
                                    </button>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default RoomResults;
