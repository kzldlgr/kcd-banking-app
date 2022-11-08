import React, { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UsersContext } from '../../../../context/UsersContext';
import { AdminContext } from '../../../../context/AdminContext';
import "./AddClient.css"
import { Navigate } from 'react-router-dom';

function AddClient() {
  const newDate = new Date();
  const { userRequest, requestInfo, setRequestInfo, setIsToggled } = useContext(AdminContext);
  const { users, setUsers } = useContext(UsersContext);
  const [clientInfo, setClientInfo] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstname: requestInfo.firstname,
      lastname: requestInfo.lastname,
      myaddress: requestInfo.myaddress,
      mymobileno: requestInfo.mymobileno,
      myemail: requestInfo.myemail,
      mypassword: requestInfo.mypassword
    }
  }
  );

  const current = new Date();
  let lastAccount;
  let validEmail;


  const validateEmail = (data) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let user = users.find(user => user.myemail === data.myemail)
    if (user) {
      validEmail = false;
      errors.myemail = "email already exist";
    } else if (!regex.test(data.myemail)) {
      errors.myemail = "This is not a valid email format!";
    } else {
      validEmail = true;
    }
  }

  function addClient() {
    if (validateEmail && validEmail) {
      if (clientInfo === undefined || clientInfo.length === 0) return
      lastAccount = users[users.length - 1]
      setUsers(account => [...account, { ...clientInfo, accountnum: Number(lastAccount.accountnum) + 1 }])
      localStorage.setItem('users', JSON.stringify(users));
    }
    console.log("Succesfully add new client")
    removeUser();
  }

  function removeUser() {
    let removeRequest = userRequest.filter(user => {
      return user.myemail == requestInfo.myemail
    })
    localStorage.removeItem('userrequest', JSON.stringify(removeRequest))
    console.log(requestInfo)
  }


  const onSubmit = data => {
    addClient();
    setClientInfo({
      firstname: data.firstname,
      lastname: data.lastname,
      myaddress: data.myaddress,
      myemail: data.myemail,
      mymobileno: data.mymobileno,
      mypassword: data.mypassword,
      usertype: 'user',
      myhistory: [{
        amount: data.amount,
        category: "",
        date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
        description: "initial deposit",
        type: "deposit"
      }],
      cardnum: Date.now(),
      transfer: [],
      balance: data.amount
    });
    // setIsToggled(true);
  }

  return (
    <div className='ManageUserContainer'>
      <h1>New Client Account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='fullName'>
          <div className='Firstname'>
            <label className='labels'>First Name</label>
            <input type='text'
              placeholder='First Name'
              {...register("firstname",
                {
                  required: 'First name is required.'
                })}
            />
          </div>

          <div className='Lastname'>
            <label className='labels'>Last Name</label>
            <input type='text'
              placeholder='Last Name'
              {...register("lastname",
                {
                  required: 'Last name is required.'
                })}
            />
          </div>
        </div>

        <div className='Address'>
          <label className='labels'>Address</label>
          <input type='text'
            placeholder='Address'
            {...register("myaddress",
              {
                required: 'Address is required.'
              })}
          />
        </div>

        <div className='Contact'>
          <label className='labels'>Contact</label>
          <input type='text'
            placeholder='Contact'
            {...register("mymobileno",
              {
                required: 'Mobile no. is required.'
              })}
          />
        </div>

        <div className='Deposit'>
          <label className='labels'>Initial Deposit</label>
          <input type='text'
            placeholder='Initial Deposit'
            {...register("amount",
              {
                required: 'Initial Deposit is required.'
              })}
          />
        </div>

        <div className='Email'>
          <label className='labels'>Email</label>
          <input type='email'
            placeholder='Email'
            {...register("myemail",
              {
                required: 'Email is required.'
              })}
          />
          <p className='errorMsgs'>{formErrors.myemail}</p>
        </div>

        <div className='Password'>
          <label className='labels'>Password</label>
          <input type='password'
            placeholder='Password'
            {...register("mypassword",
              {
                required: 'Password is required.',
                minLength: {
                  value: 8,
                  message: 'Minimum length is 8'
                },
                maxLength: {
                  value: 32,
                  message: 'Maximum length is 32'
                }
              })}
          />
        </div>

        <button>Add new client</button>
      </form>
    </div>
  )
}

export default AddClient;