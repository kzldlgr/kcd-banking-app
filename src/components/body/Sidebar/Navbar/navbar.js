import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserBalanceContext } from '../../../../context/UserBalance';
import { UsersContext } from '../../../../context/UsersContext';
import Buttons from './Buttons/buttons';
import './navbar.css';

export default function Navbar({userlevel}) {

  let navigate = useNavigate();
  const [users] = useContext(UsersContext);
  const [userBalance] = useContext(UserBalanceContext);
  const [currentUserBalance, setCurrentUserBalance] = useState([]);
  const loginUser = JSON.parse(sessionStorage.getItem('user'));

  let usermatch; 

  useEffect(() => {
    usermatch= users.find(user => user.myemail === loginUser.myemail)
    if (usermatch === undefined || usermatch.length === 0) return
    setCurrentUserBalance(usermatch.balance)
    // console.log(currentUserBalance)
  },[users, currentUserBalance])

  if (userlevel !== 'admin'){
    return (
      <div className='navbar'>
          <div className='amountbalance_container'>
            <p className='balance_title'>Available Balance</p>
            <p  className='balance_amount'><span>{currentUserBalance.toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</span></p>
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
  } else {
    return (
      <div className='navbar'>
        <div className='amountbalance_container'>
          <p className='balance_title'>Available Balance</p>
          <p  className='balance_amount'><span>{userBalance}</span></p>
        </div>
        <div className='userinfo_container'>
          <p>Name:</p>
          <p>Email:</p>
          <p>Mobile No:</p>
          <p>Address:</p>
          <p>Card Number:</p>
        </div>
      </div>
    )
  }
}
