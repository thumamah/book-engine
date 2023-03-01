import './index.css';
import Home from './Home.jsx'; 
import Navbar from './components/Navbar';
import Head from './components/Head';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Contact from './Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Contact" element={<Contact/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
