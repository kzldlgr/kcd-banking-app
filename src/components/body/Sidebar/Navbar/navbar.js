import React from 'react';
import Buttons from './Buttons/buttons';
import './navbar.css';

export default function navbar() {
  return (
    <div className='navbar'>
        <Buttons>Home</Buttons>
        <Buttons>Transaction</Buttons>
        <Buttons>Withdraw</Buttons>
        <Buttons>Deposit</Buttons>
    </div>
  )
}
