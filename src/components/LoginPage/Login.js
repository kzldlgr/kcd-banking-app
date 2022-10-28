import React, { useContext, useRef, useState } from 'react';
import usersData from '../usersData';
import { LoginContext } from '../../helper/context';
import { Link } from 'react-router-dom';
import "./Login.css"

function Login() {

  localStorage.setItem('users', JSON.stringify(usersData))
    
  const email = useRef();
  const password = useRef();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  function handleClickLogin(e) {
    // setLoggedIn(JSON.parse(localStorage.getItem('users')));
    // const [checkEmail, setCheckEmail] = useState({});
    // let checkUser = useremail.find(user => user.myemail == email.current.value && user.mypassword == password.current.value)
    // setCheckEmail(checkUser)
    // console.log([loggedIn])
    // if (checkUser.myemail !== email.current.value && email.mypassword !== password.current.value) {
    //   e.preventDefault()
    // }
   
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