import React from 'react';
import Buttons from './Buttons/buttons';
import './navbar.css';

export default function navbar() {
  return (
    <div className='navbar'>
        <Buttons text='Home' path='/Home'/>
        <Buttons text='Transaction' path='/Transaction'/>
        <Buttons text='Withdraw' path='/Withdraw'/>
        <Buttons text='Deposit' path='/Deposit'/>
        <Buttons text='Logout'/>
    </div>
  )
}
