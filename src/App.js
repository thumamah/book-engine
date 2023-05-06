import './index.css';
import Home from './Home.jsx'; 
import Login from './Login'; 
import Forgot from './Forgot'; 
import Register from './Register';
import About from './About'; 
import Hotels from './Hotels';
import { UserProvider } from "./UserContext";
import { SearchProvider } from "./SearchContext";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Contact from './Contact';
import Rooms from './Rooms';
import Confirmation from './Confirmation';
import Profile from './Profile';
import Users from './Admin/Users';
import Dashboard from './Admin/Dashboard';
import AddHotels from './Admin/AddHotels';
import AddRoom from './Admin/AddRoom';
import Bookings from './Admin/Bookings';
import HotelAnalysis from './Admin/HotelAnalysis';

function App() {
  return (
    <UserProvider>
      <SearchProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Forgot" element={<Forgot/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Hotels" element={<Hotels/>}/>
        <Route path="/Rooms" element={<Rooms/>}/>
        <Route path="/Confirmation" element={<Confirmation/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Admin/Users" element={<Users/>}/>
        <Route path="/Admin/Dashboard" element={<Dashboard/>}/>
        <Route path="/Admin/AddHotels" element={<AddHotels/>}/>
        <Route path="/Admin/AddRoom" element={<AddRoom/>}/>
        <Route path="/Admin/Bookings" element={<Bookings/>}/>
        <Route path="/Admin/HotelAnalysis" element={<HotelAnalysis/>}/>
      </Routes>
    </BrowserRouter>
    </SearchProvider>
    </UserProvider>

  );
}

export default App;
