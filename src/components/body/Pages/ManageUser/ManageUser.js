import React, { useState, useEffect, useContext } from 'react';
import { UsersContext } from '../../../../context/UsersContext';
import { useForm } from 'react-hook-form'
import './ManageUser.css'

export default function ManageUser() {

 const { users, setUsers, userInfo, setUserInfo } = useContext(UsersContext);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      input: {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        myaddress: userInfo.myaddress,
        mymobileno: userInfo.mymobileno,
        myemail: userInfo.myemail,
        mypassword: userInfo.mypassword,
      }
    }
  });

  const onSubmit = handleSubmit((data) => {
      console.log(data.input)
      users.forEach((client) => {
          if(client.accountnum === userInfo.accountnum) {
            client.firstname = data.input.firstname
           client.lastname = data.input.lastname 
            client.myaddress = data.input.myaddress
           client.mymobileno = data.input.mymobileno
            client.myemail = data.input.myemail
            client.mypassword = data.input.mypassword
            localStorage.setItem('users', JSON.stringify(users))
            setUsers(users)
            setUserInfo(users)
          }
      })
  })

  return ( 
    <div className='ManageUserContainer'>
      <h1>Edit Client's Account</h1>

      <form onSubmit={onSubmit}>

        <div className='fullName'>
          <div className='Firstname'>
            <label className='labels'>First Name</label>
            <input {...register('input.firstname')} type='text' placeholder='First Name' ></input>
          </div>

          <div className='Lastname'>
            <label className='labels'>Last Name</label>
            <input {...register('input.lastname')} type='text' placeholder='Last Name' />
          </div>
        </div>

        <div className='Address'>
          <label className='labels'>Address</label>
          <input {...register('input.myaddress')} type='text' placeholder='Address' />
        </div>

        <div className='Contact'>
          <label className='labels'>Contact</label>
          <input {...register('input.mymobileno')} type='text' placeholder='Contact' />
        </div>

        <div className='Email'>
          <label className='labels'>Email</label>
          <input {...register('input.myemail')} type='email' placeholder='Email' />
        </div>

        <div className='Password'>
          <label className='labels'>Password</label>
          <input {...register('input.mypassword')} type='password' placeholder='Password' />
        </div>

        <button >Proceed</button>
      </form>
    </div>
  )
}
