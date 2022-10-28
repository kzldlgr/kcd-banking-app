import React, { useState, useRef } from 'react';
import usersData from '../usersData';
import { Link } from 'react-router-dom';
import "./Login.css"

function Login() {

  localStorage.setItem('users', JSON.stringify(usersData));
  const userLogin = JSON.parse(localStorage.getItem('users'));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let userValid = false;


  const validateUser = (e) => {
    let test = userLogin.find(user => user.myemail == email && user.mypassword == password)
    if (test == undefined) {
      e.preventDefault();
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

          <form>
            <div className="first-input">
              <h3>Username</h3>
              <input type="text" placeholder="Username" value={email} onChange={e => setEmail(e.target.value)} className="name" />
            </div>

            <div className="second-input">
              <h3>Password</h3>
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="name" />
            </div>

            <Link to="/Bankerfrostmain">
              <button className='loginbtn' onClick={handleClickLogin}>Login</button>
            </Link>

            <div className="third-input">
              <p className="link">
                <a href="#">Register Now</a>
                <a href="#">Forgot password</a>
              </p>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}


export default Login;
