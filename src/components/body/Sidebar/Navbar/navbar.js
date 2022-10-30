import React from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from './Buttons/buttons';
import './navbar.css';

export default function Navbar() {

  let navigate = useNavigate();

  // const onHandleClick = () => {
  //   navigate('/', {replace: true})
  // }

  return (
    <div className='navbar'>
        <Buttons text='Home' path='/Bankerostmain/Home'/>
        <Buttons text='Transaction' path='/Bankerostmain/Transaction'/>
        <Buttons text='Withdraw' path='/Bankerostmain/Withdraw'/>
        <Buttons text='Deposit' path='/Bankerostmain/Deposit'/>
        <Buttons text='Transfer' path='/Bankerostmain/Transfer'/>
        <Buttons text='Logout' path='/' onMouseClick={() =>{navigate('/', {replace: true})}}/>
    </div>
  )
}
