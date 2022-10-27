import React, { useRef } from 'react'
import "./Login.css"


function Login() {
  const email = useRef();
  const password = useRef();

  function handleClickLogin(e) {

  console.log(email)




  }
  



  return (
      <div className="main">

          <div className="sub-main">

              <div className='login-form'>

                <h1>Login to your account</h1>

                    <div className="first-input">
                      <h3>Username</h3>
                      <input type="text" placeholder="Username" ref={ email } className="name"/>
                      <label></label>
                    </div>

                    <div className="second-input">
                      <h3>Password</h3>
                      <input type="password" placeholder="Password" ref={ password } className="name"/>
                      <label></label>
                    </div>

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
