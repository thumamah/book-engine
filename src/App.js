import './index.css';
import Home from './Home.jsx'; 
import Login from './Login'; 
import Forgot from './Forgot'; 
import Register from './Register';
import About from './About'; 
import Hotels from './Hotels'; 
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
        <Route path="/About" element={<About/>}/>
        <Route path="/Hotels" element={<Hotels/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
