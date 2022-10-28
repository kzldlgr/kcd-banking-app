import React from 'react';
import Buttons from './Buttons/buttons';
import './navbar.css';

export default function navbar() {
  return (
    <div className='navbar'>
        <Buttons text='Home' path='/Bankerfrostmain/Home'/>
        <Buttons text='Transaction' path='/Bankerfrostmain/Transaction'/>
        <Buttons text='Withdraw' path='/Bankerfrostmain/Withdraw'/>
        <Buttons text='Deposit' path='/Bankerfrostmain/Deposit'/>
        <Buttons text='Transfer' path='/Bankerfrostmain/Transfer'/>
        <Buttons text='Logout' path='/'/>
    </div>
  )
}
