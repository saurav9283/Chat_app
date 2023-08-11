import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Logout.css';
import {BiPowerOff} from 'react-icons/bi';

function Logout() {
  const navigate = useNavigate();
  const handelLogOut = async()=>{
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div>
      <button className='button' onClick={handelLogOut}><BiPowerOff/></button>
    </div>
  )
}

export default Logout
