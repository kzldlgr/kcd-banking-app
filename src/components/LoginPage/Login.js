import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UsersContext } from '../../context/UsersContext';
import "./Login.css"

function Login() {
  const { users } = useContext(UsersContext);
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let user = users.find(user => user.myemail === values.email && user.mypassword === values.password)
    console.log(values.email)
    console.log(values.password)
    console.log(user)
    if (user !== undefined) {
      sessionStorage.setItem('user', JSON.stringify(user));
      // user.usertype === 'admin' ? navigate('/Bankerostmain/Searchpages', { replace: true }) :
      navigate('/Bankerostmain', { replace: true })
    } else if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    } else if (user === undefined) {
      errors.email = "Email does not exist!"
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 4 characters";
    }
    return errors;
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div className='login-form'>
          <form onSubmit={handleSubmit}>
            <h1>Login to your account</h1>
            <div className="first-input">
              <h3>Username</h3>
              <input type="email"
                name="email"
                className="loginInput"
                placeholder="Username"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p className='errorMsgs'>{formErrors.email}</p>
            <div className="second-input">
              <h3>Password</h3>
              <input type="password"
                name="password"
                className="loginInput"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p className='errorMsgs'>{formErrors.password}</p>
            <button className='loginbtn' >Login</button>
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