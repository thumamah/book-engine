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
      </Routes>
    </BrowserRouter>
    </SearchProvider>
    </UserProvider>

  );
}

export default App;
