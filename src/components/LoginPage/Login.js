import React, { useRef } from 'react'
import usersData from '../usersData';
import "./Login.css"

function Login() {

localStorage.setItem('users', JSON.stringify(usersData))
const emailUser = JSON.parse(localStorage.getItem('users'))
  
  const email = useRef();
  const password = useRef();

  function handleClickLogin(e) {
    const emailUser = emailUser;
    if(email === '') return
    if(email != emailUser) return
    
  }
  



  return (
      <div className="main">

          <div className="sub-main">

              <div className='login-form'>

                <h1>Login to your account</h1>

                    <div className="first-input">
                      <h3>Username</h3>
                      <input type="text" placeholder="Username" ref={ email } className="name"/>
                    </div>

                    <div className="second-input">
                      <h3>Password</h3>
                      <input type="password" placeholder="Password" ref={ password } className="name"/>
                    </div>

                    <label className='loginLabel'></label>

                    
                    <div className="login-button">
                      <button onClick={handleClickLogin}>Login</button>
                    </div>

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
