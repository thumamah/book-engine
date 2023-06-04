import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

// creating context using the createContext function
export const UserContext = createContext();

const UserProvider = (props) => {

  // using a use state hook to save the user details
  // initially it'll be null as user is not logged in the start.
  const [user, setUser] = useState(null);

  // using the use effect hook to allow immediate changes when ever
  // the dependency argument changes.
  useEffect(() => {
    // Checking for user data in local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // setting the user data
      setUser(JSON.parse(storedUser));
    }
  }, [user]);

  // login function making request to the endpoint
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:3001/login", { email, password });
      // setting the user data from the response
      setUser({ name: res.data.email });
      // we need to set the data to the local storage and cookies for later use
      localStorage.setItem("user", JSON.stringify({ email: res.data.email, role: res.data.role }));
      localStorage.setItem("role", JSON.stringify(res.data.role ));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      Cookies.set("token", res.data.token);
      Cookies.set("role", res.data.role);
      localStorage.setItem("id", res.data.id );
    } catch (error) {
      console.error(error.message);
    }
  };

  // logout function to clear out cookies and local storage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    Cookies.remove("token")
    Cookies.remove("role")
  };

  return (
    // passing all the values and functions to use it in other files
    // which provide context values to all its child components
    <UserContext.Provider value={{ user, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export {UserProvider}
