import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UsersContext } from '../../../../context/UsersContext';
import { AdminContext } from '../../../../context/AdminContext';
import swal from 'sweetalert';
import "./AddClient.css"

function AddClient() {
  const newDate = new Date();
  const { userRequest, setUserRequest, requestInfo, setRequestInfo, setIsToggled } = useContext(AdminContext);
  const { users, setUsers } = useContext(UsersContext);
  const [formErrors] = useState([]);
  const { register, reset, handleSubmit } = useForm({
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
  let validEmail = false;

  function addNewClient(data) {
    if (data === undefined || data.length === 0) return
    lastAccount = users[users.length - 1]
    setUsers(account => [...account, {
      accountnum: Number(lastAccount.accountnum) + 1,
      firstname: data.firstname,
      lastname: data.lastname,
      mymobileno: data.mymobileno,
      myaddress: data.myaddress,
      myemail: data.myemail,
      mypassword: data.mypassword,
      myhistory: [{
        amount: data.amount,
        category: "",
        date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
        description: "initial deposit",
        type: "deposit"
      }],
      cardnum: Date.now(),
      transfer: [],
      balance: data.amount,
      usertype: 'user'
    }])
    console.log("Succesfully add new client")
  }

  function removeUser() {
    let removeRequest = userRequest.filter(user => user.myemail != requestInfo.myemail)
    localStorage.setItem('userrequest', JSON.stringify(removeRequest))
    setUserRequest(removeRequest)
    setRequestInfo({});
  }

  const onSubmit = data => {
    console.log(data)
    addNewClient(data);
    removeUser();
    reset({
      firstname: "",
      lastname: "",
      myaddress: "",
      myemail: "",
      mypassword: "",
      amount: "",
      mymobileno: ""
    })

    swal({
      text: "New user has been added",
      icon: "success",
      button: "Done",
    });
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