import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { UsersContext } from '../../../../context/UsersContext';
import { UserBalanceContext } from '../../../../context/UserBalance';
import './transfer.css';

export default function Transfer() {

  const {register, handleSubmit} = useForm();
  const [users, setUsers] = useContext(UsersContext);
  const [userBalance, setUserBalance] = useContext(UserBalanceContext);
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

  return (
    <div className='pages'>
      <form onSubmit={handleSubmit(data => {

        transferTo = users.find(user => user.accountnum === data.accountnum);
        transferTo === undefined ? console.log('no user found') 
        : userBalance >= data.amount ?
          users.forEach(user => {
            transferReceiver(user, transferTo, data)
            transferSender(user, transferTo, data)
            localStorage.setItem('users', JSON.stringify(users))
            setUsers(users)
            console.log('Successfully Transfer the amount')
          })
          :
            console.log('insufficient funds')

      })} className='formtransfer'>
        <div className='transferinput'>
          <span>Account Number</span>
          <input  {...register('accountnum')}/>
        </div>
        
        <div className='transferinput'>
          <span>Account Name</span>
          <input  {...register('accountname')}/>
        </div>
        
        <div className='transferinput'>
          <span>Amount</span>
          <input  {...register('amount')}/>
        </div>
        
        <div className='transferinput'>
          <span>Purpose</span>
          <input {...register('purpose')}/>
        </div>
        
        <div className='transferinput'>
          <span>Note</span>
          <textarea {...register('note')}/>
        </div>
        <input type='submit' value='Continue'/>
      </form>
    </div>
  )
}