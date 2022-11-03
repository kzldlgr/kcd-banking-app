import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UsersContext } from '../../context/UsersContext';
import "./Login.css"


function Login() {
  const [users] = useContext(UsersContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateUser = (e) => {
    
    if (users === undefined) {
      console.log('users context is undefined')
      e.preventDefault();
      return
    } else{
      let user = users.find(user => user.myemail === email && user.mypassword === password)
      sessionStorage.setItem('user', JSON.stringify(user));
      navigate('/Bankerostmain', {replace: true})
    }
    
  }

  function handleClickLogin(e) {
    validateUser(e);
  }

  return (
    <div className="main">
      <div className="sub-main">
        <div className='login-form'>
          <h1>Login to your account</h1>

          <div className="first-input">
            <h3>Username</h3>
            <input type="email" placeholder="Username" value={email} onChange={e => setEmail(e.target.value)} className="loginInput" />
          </div>

          <div className="second-input">
            <h3>Password</h3>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="loginInput" />
          </div>

          <Link className='linkbutton' to='/Bankerostmain/Transaction'>
            <button className='loginbtn' onClick={handleClickLogin}>Login</button>
          </Link>

          <div className="third-input">
            <Link to='/SignUp'>Register Now</Link> |
            <Link to='/ForgotPassword'>Forgot Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;