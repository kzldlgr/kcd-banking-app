import React, { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { UsersContext } from '../../context/UsersContext';
import "./SignUp.css"



function SignUp() {
  const [details, setDetails] = useState([]);
  const current = new Date();
  const [users, setUsers] = useContext(UsersContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (details === undefined || details.length === 0) return
    setUsers(account => { account.push(details) })
    localStorage.setItem('users', JSON.stringify(users));
    console.log("Succesfully add new client")
  }, [details])



  const onSubmit = data => {
    setDetails({ ...data, usertype: 'user', myhistory: [], cardnum: Date.now() })
  }

  return (
    <div className='mainSignUp'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="subMain">
          <h1>Sign up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr></hr>
          <label>First Name:</label>
          <input className='inputBox' {...register("firstName")} type="text" placeholder='Enter your First Name' />
          <label>Last Name:</label>
          <input className='inputBox' {...register("lastName")} type="text" placeholder='Enter your Last Name' />
          <label>Addres:</label>
          <input className='inputBox' {...register("address")} type="text" placeholder='Enter your current Address' />
          <label>Mobile No.:</label>
          <input className='inputBox' {...register("mobileNo")} type="number" placeholder='Enter your Mobile No.' />
          <label>Email:</label>
          <input className='inputBox' {...register("email")} type="email" placeholder='Enter your Email' />
          <label>Password:</label>
          <input className='inputBox' {...register("password")} type="password" placeholder='Enter your Password' />
          <p>By creating an account you agree to our <Link to='/SignUp' >Terms & Privacy</Link>.</p>
            <button className='signupbtn' type="submit">Sign Up</button>
            <Link to="/" >
              <button className="cancelbtn" onClick={e => handleSubmit(e)}>Cancel</button>
            </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;