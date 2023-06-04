import React from 'react'
import Navbar from './components/Navbar'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import img_logo from './components/log.png';
import { NavLink } from 'react-router-dom'
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Contact() {

  // use state hooks to update the user values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // navigate hook to redirect user to home page
  const nav = useNavigate();

  // function to send request to the contact endpoint
  const handleContact = async (e) => {
    // used to avoid default behaviour
    e.preventDefault();
    // making a request to message endpoint by sending the user provided message data
    try {
      const response = await axios.post('http://localhost:3001/contact', { name, email, message });
      console.log(response.data);
      nav("/")

    } catch (error) {
      console.error(error);
    }
  };

  // contact form using bootstrap
  return (
    <div>
      <Navbar />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={img_logo}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Contact Us
            </h2>

          </div>
          <form className="mt-8 space-y-6" onSubmit={handleContact}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">

              <div>

                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative p-4 block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <br />
              <div>
                <label htmlFor="Name" className="sr-only">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="Name"
                  name="Name"
                  type="Name"
                  autoComplete="Name"
                  required
                  className="relative p-4 block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Name"
                />
              </div>

              <br />
              <div>
                <label htmlFor="message" className="sr-only">
                  message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  id="message"

                  name="message"
                  type="message"
                  autoComplete="Name"
                  required
                  className="relative p-4 block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter Message"
                />
              </div>

            </div>



            <div>
              <button

                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >

                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
