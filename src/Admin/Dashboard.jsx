import React from 'react'
import './Sidebar.css'
import Sidebar from './Sidebar'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const [cookies, setCookie] = useCookies(['role']);
    const navi = useNavigate()
    if(cookies.role==="admin"){
        console.log("good")
    }
    else{
        navi('../')
        console.log("bad")
    }
  return (
    
    <div className='main-admin'>
        <Sidebar/>
      Hello, welcome to admin portal
    </div>
  )
}

export default Dashboard
