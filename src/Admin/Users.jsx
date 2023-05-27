import React from 'react'
import Sidebar from './Sidebar'
import './Sidebar.css'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Users = () => {

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
    <div>
        <Sidebar/>
        <div className="main-admin">
      Hi, Users ersgtgr trghth tyhtyhj ythjrty jhytrjtyjh
      </div>
    </div>
  )
}

export default Users
