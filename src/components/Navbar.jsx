import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom';
import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import img_logo from '../components/log.png';
import { Link } from "react-router-dom";


// defining the nav names and links
const navigation = [
  { name: 'Home', href: '/', },
  { name: 'Contact', href: '/Contact', },
]

// applying css classes from tailwind css
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const { user, login, logout } = useContext(UserContext);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">

                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={img_logo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block ">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) => {
                          return (
                            'px-3 py-2 rounded-md text-ml font-medium no-underline' +
                            (isActive ? 'text-gray-300 bg-gray-700 text-white'
                              : 'bg-gray-800 text-white')
                          );
                        }}

                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>


              </div>
              {/* if user is logged in then show the logout and profile button else show the
                  login and register button
              */}
              {user ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* if admin is logged in then link to admin profile else user profile */}
                  {user.role === "admin" ? (
                    <Link to={"/Admin/Dashboard"}>
                      <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3">

                        {user.role} Profile

                      </button>
                    </Link>
                  ) : (
                    <Link to={"../Profile"}>
                      <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3">

                        {user.role} Profile

                      </button>
                    </Link>
                  )}

                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3">


                    <NavLink
                      key={"Logout"}
                      to={"/Logout"}
                    >Logout
                    </NavLink>
                  </button>

                </div>
              ) : (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3">

                    <NavLink
                      key={"Login"}
                      to={"/Login"}
                    >Login
                    </NavLink>
                  </button>

                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3">

                    <NavLink
                      key={"Register"}
                      to={"/Register"}
                    >
                      Register
                    </NavLink>
                  </button>

                </div>)}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
