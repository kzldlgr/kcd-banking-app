import React from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from './Buttons/buttons';
import './navbar.css';

export default function Navbar() {

  let navigate = useNavigate();

  return (
    <div className='navbar'>
        <div className='amountbalance_container'>
          <p className='balance_title'>Available Balance</p>
          <p  className='balance_amount'><span>P 128,000.00</span></p>
        </div>
        <div className='navbtns_container'>
          <Buttons text='Deposit' path='/Bankerostmain/Deposit'/>
          <Buttons text='Withdraw' path='/Bankerostmain/Withdraw'/>
          <Buttons text='Send Money' path='/Bankerostmain/Transfer'/>
          <Buttons text='Friends' path='/Bankerostmain/Transfer'/>
          <Buttons text='Transaction' path='/Bankerostmain/Transaction'/>  
          <Buttons text='Logout' path='/' onMouseClick={() =>{navigate('/', {replace: true})}}/>
        </div>
    </div>
  )
}
