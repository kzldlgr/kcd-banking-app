import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { UserBalanceContext } from '../../../../context/UserBalance';
import { UsersContext } from '../../../../context/UsersContext';
import Buttons from './Buttons/buttons';
import './navbar.css';

export default function Navbar({userlevel}) {

  let navigate = useNavigate();
  const {users, userBalance,setUserBalance, userInfo} = useContext(UsersContext);
  // const [userBalance, setUserBalance] = useContext(UserBalanceContext);
  const loginUser = JSON.parse(sessionStorage.getItem('user'));

  let usermatch; 
  
  useEffect(() => {
    if (loginUser.usertype === 'admin'){
      setUserBalance('0.00')
    } else {
      usermatch = users.find(user => user.myemail === loginUser.myemail)
      if (usermatch !== undefined && usermatch.usertype !== 'admin') {
        setUserBalance(Number(usermatch.balance))
      } 
    }
  },[users])
  
  if (userlevel !== 'admin'){
    return (
      <div className='navbar'>
          <div className='amountbalance_container'>
            <p className='balance_title'>Available Balance</p>
            <p  className='balance_amount'><span>{Number(userBalance).toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</span></p>
          </div>
          <div className='navbtns_container'>
            <Buttons text='Deposit' path='/Bankerostmain/Deposit'/>
            <Buttons text='Withdraw' path='/Bankerostmain/Withdraw'/>
            <Buttons text='Send Money' path='/Bankerostmain/Transfer'/>
            <Buttons text='Friends' path='/Bankerostmain/Transfer'/>
            <Buttons text='Transaction' path='/Bankerostmain/Transaction'/>  
            <Buttons text='Logout' path='/' onMouseClick={() =>{navigate('/', {replace: true}) 
            sessionStorage.setItem('user', JSON.stringify({}))}}/>
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
        <p>Card Number: { userInfo.accountnum }</p>
          <p>Name:{ userInfo.firstname } { userInfo.lastname }</p>
          <p>Email:{ userInfo.myemail }</p>
          <p>Mobile No: { userInfo.mymobileno }</p>
          <p>Address: { userInfo.myaddress }</p>
        </div>
        <Buttons text='Logout' path='/' onMouseClick={() =>{navigate('/', {replace: true})
        sessionStorage.setItem('user', JSON.stringify({}))}}/>
      </div>
    )
  }
}
