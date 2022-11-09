import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../../../context/AdminContext';
import { UsersContext } from '../../../../context/UsersContext';
import Buttons from './Buttons/buttons';
import './navbar.css';

export default function Navbar({ userlevel }) {

  let navigate = useNavigate();
  const {users, userBalance,setUserBalance,userInfo} = useContext(UsersContext);
  const {isToggled, setIsToggled} = useContext(AdminContext);
  const loginUser = JSON.parse(sessionStorage.getItem('user'));

  let usermatch;

  useEffect(() => {
    if (loginUser.usertype === 'admin') {
      setUserBalance('0.00')
    } else {
      usermatch = users.find(user => user.myemail === loginUser.myemail)
      if (usermatch !== undefined && usermatch.usertype !== 'admin') {
        setUserBalance(Number(usermatch.balance))
      }
    }
  }, [users])

  if (userlevel !== 'admin') {
    return (
      <div className='navbar'>
        <div className='amountbalance_container'>
          <p className='balance_title'>Available Balance</p>
          <p className='balance_amount'><span>{Number(userBalance).toLocaleString('tl-PH', { style: 'currency', currency: 'PHP', })}</span></p>
        </div>
        <div className='navbtns_container'>
          <Buttons text='Deposit' path='/Bankerostmain/Deposit' image={require('../../../../assets/icons/deposit.png')} />
          <Buttons text='Withdraw' path='/Bankerostmain/Withdraw' image={require('../../../../assets/icons/withdrawal.png')}/>
          <Buttons text='Send Money' path='/Bankerostmain/Transfer' image={require('../../../../assets/icons/sendmoney.png')}/>
          <Buttons text='Transaction' path='/Bankerostmain/Transaction' image={require('../../../../assets/icons/transaction2.png')}/>
          <Buttons text='Expenses' path='/Bankerostmain/Expense' image={require('../../../../assets/icons/budget.png')}/>
          <Buttons text='Logout' path='/' image={require('../../../../assets/icons/logout2.png')} onMouseClick={() => {
            navigate('/', { replace: true })
            sessionStorage.setItem('user', JSON.stringify({}))
          }} />
        </div>
      </div>
    )
  } else {
    return (
      <div className='navbar'>
        <div className='amountbalance_container'>
          <p className='balance_title'>Available Balance</p>
          <p className='balance_amount'><span>{userBalance.toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</span></p>
        </div>
        
        <div className='userinfo_container'>
        <p>Card Number: { userInfo.accountnum }</p>
          <p>Name:{ userInfo.firstname } { userInfo.lastname }</p>
          <p>Email:{ userInfo.myemail }</p>
          <p>Contact: { userInfo.mymobileno }</p>
          <p>Address: { userInfo.myaddress }</p>
        </div>
        <div className='navbtns_container'>

          <Buttons text='Search' path='/Bankerostmain/Admin' 
          onMouseClick={() =>{
            navigate('/Bankerostmain/Admin', { replace: true })
            setIsToggled(true)
            }} image={require('../../../../assets/icons/search.png')}/>

          <Buttons text='Add Client' path='/Bankerostmain/AddClient' 
          onMouseClick={() =>{
            navigate('/Bankerostmain/AddClient', { replace: true })
            setIsToggled(false)
            }} image={require('../../../../assets/icons/add-user.png')}/>

          <Buttons text='Request' path='/Bankerostmain/UserRequest' 
            onMouseClick={() =>{
              navigate('/Bankerostmain/UserRequest', { replace: true })
              setIsToggled(false)
              }} image={require('../../../../assets/icons/notification.png')}/>

          <Buttons text='Transfer' path='/Bankerostmain/Transfer' 
            onMouseClick={() =>{
              navigate('/Bankerostmain/Transfer', { replace: true })
              setIsToggled(false)
              }} image={require('../../../../assets/icons/transaction.png')}/>

          <Buttons text='Logout'  path='/' 
          onMouseClick={() => {
            navigate('/', { replace: true })
            sessionStorage.setItem('user', JSON.stringify({}))
            setIsToggled(true)
          }} image={require('../../../../assets/icons/logout2.png')}/>

        </div> 
      </div>
    )
  }
}
