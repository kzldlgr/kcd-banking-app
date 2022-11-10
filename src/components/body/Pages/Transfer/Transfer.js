import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { UsersContext } from '../../../../context/UsersContext';
import './transfer.css';
import arrow from '../../../../assets/images/up-arrow.png'


// const { register, handleSubmit, setValue } = useForm({
//   defaultValues: {
//     input: {
//       firstname: userInfo.firstname,
//       lastname: userInfo.lastname,
//       myaddress: userInfo.myaddress,
//       mymobileno: userInfo.mymobileno,
//       myemail: userInfo.myemail,
//       mypassword: userInfo.mypassword,
//     }
//   }
// });
export default function Transfer() {

  const [errorMessages, setErrorMessages] = useState('')
  const { users, setUsers, userBalance, setUserBalance, userInfo, setUserInfo } = useContext(UsersContext);
  const currentUser = JSON.parse(sessionStorage.getItem('user'));
  const [receiverData, setReceiverData] = useState({})
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      input: {
        accountnum: userInfo.accountnum,
        firstname: userInfo.firstname,
        amount: userInfo.amount,
        purpose: userInfo.purpose,
        note: userInfo.note,
      }
    }
  });

  let transferTo;
  const newDate = new Date();

  const transferReceiver = (userdata, data) => {
    if (userdata.accountnum === data.accountnumReceiver) {
      userdata.balance = Number(userdata.balance) + Number(data.input.amount)
      userdata.transfer.push(data)
      userdata.myhistory.push({
        date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
        description: userInfo ? `You received from ${userInfo.firstname} ${userInfo.lastname}` : `You received from ${currentUser.firstname} ${currentUser.lastname}`,
        type: 'transfer',
        category: '',
        amount: data.input.amount
      })
    }
  }

  const transferSender = (userdata, data) => {
    if (userdata.accountnum === data.input.accountnum) {
      userdata.balance = Number(userdata.balance) - Number(data.input.amount)
      userdata.transfer.push(data)
      userdata.myhistory.push({
        date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
        description: userInfo ? `You transfered to ${data.firstnameReceiver} ${data.lastnameReceiver}` : `You transfered to `,
        type: 'transfer',
        category: '',
        amount: data.input.amount
      })
      setUserBalance(userdata.balance)
    } 
  }

  const checkUsers = (data) => {
    users.forEach(user => {

        transferReceiver(user, data)
        transferSender(user, data)

      localStorage.setItem('users', JSON.stringify(users))
      setUsers(users)
      setErrorMessages('Successfully Transfer the amount')
    })
  }

  if (currentUser.usertype === 'user') {
    return (
      <div className='pages'>
        <form onSubmit={handleSubmit(data => {

          transferTo = users.find(user => user.accountnum === data.accountnum);
          console.log(transferTo)
          transferTo === undefined ? setErrorMessages('no user found')
            : userBalance >= data.amount ?
              checkUsers(transferTo, data) : setErrorMessages('insufficient funds')

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
            <input type='number' {...register('accountnum')} />

          </div>

          <div className='transferinput'>
            <span>Account Name</span>
            <input  {...register('firstname')} />
          </div>

          <div className='transferinput'>
            <span>Amount</span>
            <input type='number' {...register('amount')} />
          </div>

          <div className='transferinput'>
            <span>Purpose</span>
            <input {...register('purpose')} />
          </div>

          <div className='transferinput'>
            <span>Note</span>
            <textarea {...register('note')} />
          </div>
          <p className='errorMsgs'>{errorMessages}</p>
          <input className='submitbtn' type='submit' value='Continue' />
        </form>
      </div>

    )
  } else {
    return (
      <div className='pages'>
        <form onSubmit={handleSubmit(data => {
          
          data.accountnumReceiver === undefined ? setErrorMessages('no user found')
            : Number(userInfo.balance) >= data.input.amount ?
              checkUsers(data) : setErrorMessages('insufficient funds')

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
            <input type='number' {...register('input.accountnum')} />

          </div>

          <div className='transferinput'>
            <span>Account Name</span>
            <input  {...register('input.firstname')} />
          </div>

          <div className='transferinput'>
            <span>Amount</span>
            <input type='number' {...register('input.amount')} />
          </div>

          <div className='transferinput'>
            <span>Purpose</span>
            <input {...register('input.purpose')} />
          </div>

          <div className='transferinput'>
            <span>Note</span>
            <textarea {...register('input.note')} />
          </div>
          <p className='errorMsgs'>{errorMessages}</p>
          <input className='submitbtn' type='submit' value='Continue' />
        </form>



        <div className="transferDivider">
          <img src={arrow} className="arrow-img" />
        </div>



        <form className='secondForm'>

          <div className='transferinput'>
            <span>Account Number</span>
            <input type='number' {...register('accountnumReceiver')} />

          </div>

          <div className='transferinput'>
            <span>First Name</span>
            <input  {...register('firstnameReceiver')} />
          </div>

          <div className='transferinput'>
            <span>Last Name</span>
            <input  {...register('lastnameReceiver')} />
          </div>
        </form>
      </div>
    )
  }
}
