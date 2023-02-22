import React from 'react'
import logo from './log.png';
import '../App.css';

const Navbar = () => {
  return (
    <div className='nav-bar'>
      <div className='nav-container'>
        <span className="log"><img src={logo} width="200" height={100} alt="Logo" /></span>
        <div className="nav-item">
          <a className='navBtn'>Home</a>
          <a className='navBtn'>About</a>
          <a className='navBtn'>Contact</a>
          
          <button className='navBtn'>Register</button>
          <button className='navBtn'>Login</button>
        </div>
      </div>
      
    </div>
  )
}

export default Navbar
