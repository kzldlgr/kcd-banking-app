import React, { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { UsersContext } from '../../context/UsersContext';
import "./SignUp.css"

function SignUp() {
  const [details, setDetails] = useState([]);
  const current = new Date();
  const {users, setUsers} = useContext(UsersContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  let lastAccount;
  let valid = false;

  useEffect(() => {
    if (details === undefined || details.length === 0) return
    lastAccount = users[users.length - 1]
    setUsers(account => [...account, { ...details, accountnum: Number(lastAccount.accountnum) + 1 }])
    localStorage.setItem('users', JSON.stringify(users));
    console.log("Succesfully add new client")
  }, [details])

  const validate = (data) => {
    let user = users.find(user => user.myemail === data.myemail)
    if(data.myemail === user){
      valid = true;
    }
  }

  const onSubmit = data => {
    validate(data);
    setDetails({ ...data, usertype: 'user', myhistory: [], cardnum: Date.now(), transfer: [], balance: 0 });
  }

  return (
    <div className='mainSignUp'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="subMain">
          <h1>Sign up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr></hr>
          <label>First Name:</label>
          <input className='inputBox'
            {...register("firstname",
              {
                required: 'First name is required.'
              })}
            type="text"
            placeholder='Enter your First Name'
          />
          <p className='errorMsgs'>{errors.firstname?.message}</p>
          <label>Last Name:</label>
          <input className='inputBox'
            {...register("lastname",
              {
                required: 'Last name is required.'
              })}
            type="text"
            placeholder='Enter your Last Name'
          />
          <p className='errorMsgs'>{errors.lastname?.message}</p>
          <label>Addres:</label>
          <input className='inputBox'
            {...register("myaddress",
              {
                required: 'Address is required.'
              })}
            type="text"
            placeholder='Enter your current Address'
          />
          <p className='errorMsgs'>{errors.myaddress?.message}</p>
          <label>Mobile No.:</label>
          <input className='inputBox'
            {...register("mymobileno",
              {
                required: 'Mobile no. is required.'
              })}
            type="number"
            placeholder='Enter your Mobile No.'
          />
          <p className='errorMsgs'>{errors.mymobileno?.message}</p>
          <label>Email:</label>
          <input className='inputBox'
            {...register("myemail",
              {
                required: 'Email is required.'
              })}
            type="email"
            placeholder='Enter your Email'
          />
          <p className='errorMsgs'>{errors.myemail?.message}</p>
          {valid?<p className="errorMsgs">Email already exists</p>: []}
          <label>Password:</label>
          <input className='inputBox'
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
            type="password"
            placeholder='Enter your Password'
          />
          <p className='errorMsgs'>{errors.mypassword?.message}</p>
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