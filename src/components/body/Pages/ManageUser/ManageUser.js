import React from 'react'
import { useForm } from 'react-hook-form'
import './ManageUser.css'

export default function ManageUser() {

  const { register, handleSubmit } = useForm();

  return ( 
    <div className='ManageUserContainer'>
      <h1>Edit Client's Account</h1>
      <form>

        <div className='fullName'>
          <div className='Firstname'>
            <label className='labels'>First Name</label>
            <input  type='text' placeholder='First Name'/>
          </div>

          <div className='Lastname'>
            <label className='labels'>Last Name</label>
            <input  type='text' placeholder='Last Name'/>
          </div>
        </div>

        <div className='Address'>
          <label className='labels'>Address</label>
          <input  type='text' placeholder='Address'/>
        </div>

        <div className='Contact'>
          <label className='labels'>Contact</label>
          <input  type='text' placeholder='Contact'/>
        </div>

        <div className='Email'>
          <label className='labels'>Email</label>
          <input  type='email' placeholder='Email'/>
        </div>

        <div className='Password'>
          <label className='labels'>Password</label>
          <input  type='password' placeholder='Password'/>
        </div>

        <button>Proceed</button>
      </form>
    </div>
  )
}