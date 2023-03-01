import React from 'react';
import img1 from './head-img1.jpg';
import './Head.css';

const Navbar = (props) => {
    return (
        <div className='head'>
            <div className="head-img">
                <img src={img1}  alt="" />
            </div>
        </div>
        
    )
    
}

export default Navbar
