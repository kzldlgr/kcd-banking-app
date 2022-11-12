import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { UsersContext } from '../../../../context/UsersContext';
import './transfer.css';

export default function Transfer() {

  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const [errorMessages, setErrorMessages] = useState('')
  const {users, setUsers, userBalance, setUserBalance} = useContext(UsersContext);
  const currentUser = JSON.parse(sessionStorage.getItem('user'));

  let transferTo;
  const newDate = new Date();
  
  const transferReceiver = (userdata, receiver, data) => {
    if (userdata.accountnum === receiver.accountnum) {
      userdata.balance = Number(userdata.balance) + Number(data.amount)
      userdata.transfer.push(data)
      userdata.myhistory.push({
        date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
        description: `You received from ${currentUser.firstname} ${currentUser.lastname}`,
        type: 'transfer',
        category: '',
        amount: data.amount
      })
    }
  }

  const transferSender = (userdata, receiver, data) => {
    if (userdata.accountnum === currentUser.accountnum) {
      userdata.balance = Number(userdata.balance) - Number(data.amount)
      userdata.transfer.push(data)
      userdata.myhistory.push({
        date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
        description: `You transfered to ${receiver.firstname} ${receiver.lastname}`,
        type: 'transfer',
        category: '',
        amount: data.amount
      })
      setUserBalance(userdata.balance)
    }
  }

  const checkUsers = (transferTo, data) => {
    users.forEach(user => {
      
      transferReceiver(user, transferTo, data)
      transferSender(user, transferTo, data)
      
      localStorage.setItem('users', JSON.stringify(users))
      setUsers(users)
      setErrorMessages('Successfully Transfer the amount')
    })
  }

  

  return (
    <div className='pages'>
      <form onSubmit={handleSubmit(data => {

        transferTo = users.find(user => user.accountnum === data.accountnum);
        
        transferTo === undefined ? setErrorMessages('no user found') 
        : userBalance >= data.amount ?        
          checkUsers(transferTo, data): setErrorMessages('insufficient funds')

        reset({
          accountnum: '',
          accountname: '',
          amount: '',
          purpose: '',
          note: ''
        })
      
      })} className='formtransfer'>
        
        <div className='transferinput'>
          <span>Account Number</span>
          <input type='number' {...register('accountnum')}/>
          
        </div>
        
        <div className='transferinput'>
          <span>Account Name</span>
          <input  {...register('accountname')}/>
        </div>
        
        <div className='transferinput'>
          <span>Amount</span>
          <input type='number' {...register('amount')}/>
        </div>
        
        <div className='transferinput'>
          <span>Purpose</span>
          <input {...register('purpose')}/>
        </div>
        
        <div className='transferinput'>
          <span>Note</span>
          <textarea {...register('note')}/>
        </div>
        <p className='errorMsgs'>{errorMessages}</p>
        <input className='submitbtn' type='submit' value='Continue'/>
      </form>
    </div>
  )
}