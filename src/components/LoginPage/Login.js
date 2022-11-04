import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UsersContext } from '../../context/UsersContext';
import "./Login.css"


function Login() {
  const [users, setUsers] = useContext(UsersContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {

    let user = users.find(user => user.myemail === data.myemail && user.mypassword === data.mypassword);
    if (user === undefined) {
      return;
    }
    // setUsers(JSON.parse(localStorage.getItem('users')))
    sessionStorage.setItem('user', JSON.stringify(user));
    navigate('/Bankerostmain', { replace: true });
  }

return (
  <div className="main">
    <div className="sub-main">
      <div className='login-form'>
        <h1>Login to your account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="first-input">
            <h3>Username</h3>
            <input type="email" placeholder="Username" {...register("myemail")} className="loginInput" />
          </div>

          <div className="second-input">
            <h3>Password</h3>
            <input type="password" placeholder="Password" {...register("mypassword")} className="loginInput" />
          </div>
          {/* <Link className='linkbutton' to='/Bankerostmain/Transaction'> */}
          <button className='loginbtn' >Login</button>
          {/* </Link> */}

          <div className="third-input">
            <Link to='/SignUp'>Register Now</Link> |
            <Link to='/ForgotPassword'>Forgot Password</Link>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}

export default Login;