import './index.css';
import Home from './Home.jsx'; 
import Login from './Login'; 
import Forgot from './Forgot'; 
import Register from './Register'; 
import Navbar from './components/Navbar';
import Head from './components/Head';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Contact from './Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Forgot" element={<Forgot/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
