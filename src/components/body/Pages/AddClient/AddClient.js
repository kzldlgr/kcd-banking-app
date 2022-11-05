import React,{ useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UsersContext } from '../../../../context/UsersContext';
import "./AddClient.css"



export default function AddClient() {
  const [details, setDetails] = useState([]);
  const current = new Date();
  const {users, setUsers} = useContext(UsersContext);

  const {register, handleSubmit, formState: { errors }} = useForm();

  useEffect(()=>{
    if(details === undefined || details.length === 0) return
    setUsers(account => {account.push(details)})
    localStorage.setItem('users', JSON.stringify(users));
    console.log("Succesfully add new client")
  },[details])



  const onSubmit = data =>{
    setDetails({...data, myhistory: [], cardnum: Date.now()})
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit)}>
    <label>First Name:</label>
    <input className='addClientInput' {...register("firstName")}/>
    <label>Last Name:</label>
    <input className='addClientInput' {...register("lastName")} type="name"/>
    <label>Addres:</label>
    <input className='addClientInput' {...register("address")} type="text"/>
    <label>Mobile No.:</label>
    <input className='addClientInput' {...register("mobileNo")} type="number"/>
    <label>Email:</label>
    <input className='addClientInput' {...register("email")} type="email"/>
    <label>Password:</label>
    <input className='addClientInput' {...register("password")} type="password"/>
    <label>Usertype:</label>
    <input className='addClientInput' {...register("userType")} type="text"/>
    <label>Initial Deposit:</label>
    <input className='addClientInput' {...register("initialDeposit")} type="number"/>
    <button className='addClientBtn' type="submit">ADD NEW CLIENT</button>
    </form>
  )
}
