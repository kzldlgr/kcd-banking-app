import React, { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import { UsersContext } from '../../context/UsersContext';
import swal from 'sweetalert';
import "./SignUp.css"

function SignUp() {
  let navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const { users } = useContext(UsersContext);
  const current = new Date();
  const { userRequest, setUserRequest } = useContext(AdminContext);
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  let valid = false;

  useEffect(() => {
    if (details === undefined || details.length === 0) return
    setUserRequest(account => [...account, { ...details }])
  }, [details])

  const validate = (data) => {
    let user = users.find(user => user.myemail === data.myemail)
    if (data.myemail === user) {
      valid = true;
    }
  }

  const onSubmit = data => {
    validate(data);
    setDetails({
      ...data,
      usertype: 'user',
      myhistory: [],
      cardnum: Date.now(),
      transfer: [],
      balance: 0
    });

    reset({
      firstname: "",
      lastname: "",
      myaddress: "",
      mymobileno: "",
      myemail: "",
      mypassword: ""
    })
    swal({
      text: "Successfully created an account!",
      icon: "success",
      button: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        navigate('/', { replace: true })
        swal("Account will be review and approve by admin", {
          icon: "success",
        });
      }
    });
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
          {valid ? <p className="errorMsgs">Email already exists</p> : []}
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
            <button className="cancelbtn" >Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;