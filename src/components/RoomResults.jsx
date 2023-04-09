import burj1 from './burj1.jpg';
import Footer from './Footer';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const products = [
    {
      id: 1,
      name: 'burj',
      href: '#',
      imageSrc: burj1,
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
        id: 1,
        name: 'burj',
        href: '#',
        imageSrc: burj1,
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$3500',
        color: 'Black',
      },
      {
        id: 1,
        name: 'burj',
        href: '#',
        imageSrc: burj1,
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
      },
    // More products...
  ]
  
  const RoomResults = (props) => {
    
    const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/findRoom/64318ed87edb27a85685489d`);
        setHotels(response.data);
        console.log(response.data)
        console.log(props.hotelId)
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotels();
  }, [props.hotelId]);
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Hotels</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-1 xl:gap-x-8">
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
                    <h3 className="text-sm text-gray-700">
                      <a href={product._id}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.info}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
  export default RoomResults;
  