import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:3001/login", { email, password });
      setUser({ name: res.data.email });
      setUserName(res.data.email);
      localStorage.setItem("user", JSON.stringify({ email: res.data.email }));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("id", res.data.id );
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export {UserProvider}
