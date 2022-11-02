import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "./Login.css"


function Login() {

  const userLogin = JSON.parse(localStorage.getItem('users'));



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateUser = (e) => {
    let user = userLogin.find(user => user.myemail === email && user.mypassword === password)
    if (user === undefined) {
      e.preventDefault();
      return
    }
    const userAccount = { 'firstname': user.firstname, 'lastname': user.lastname, 'myemail': user.myemail }
    sessionStorage.setItem('user', JSON.stringify(userAccount));
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
            <input type="text" placeholder="Username" value={email} onChange={e => setEmail(e.target.value)} className="name" />

          </div>

          <div className="second-input">
            <h3>Password</h3>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="name" />
          </div>

          <Link className='linkbutton' to='/Bankerfrostmain'>
            <button className='loginbtn' onClick={handleClickLogin}>Login</button>
          </Link>

          <div className="third-input">
            <p className="link">
              <a href="#">Register Now</a>
              <a href="#">Forgot password</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;