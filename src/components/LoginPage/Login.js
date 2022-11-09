import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UsersContext";
import "./Login.css";

function Login() {
	const { users, loginUser, setLoginUser } = useContext(UsersContext);
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
		let user = users.find(
			(user) => user.myemail === values.email && user.mypassword === values.password
		);

		if (user !== undefined) {
			sessionStorage.setItem("user", JSON.stringify(user));
			setLoginUser(users.find((user) => user.myemail === values.email));
			user.usertype === "admin"
				? navigate("/Bankerostmain/Admin", { replace: true })
				: navigate("/Bankerostmain/Transaction", { replace: true });
		} else if (!values.email) {
			errors.email = "Email is required.";
		} else if (!regex.test(values.email)) {
			errors.email = "This is not a valid email format!";
		} else if (user === undefined) {
			errors.email = "Email does not exist.";
		}
		if (!values.password) {
			errors.password = "Password is required.";
		} else if (values.password.length < 8) {
			errors.password = "Password must be more than 4 characters";
		}
		return errors;
	};

	return (
		// <div className="main">
		//   <div className="sub-main">
		//     <div className='login-form'>
		//       <form onSubmit={handleSubmit}>
		//         <h1>Login to your account</h1>
		//         <hr></hr>
		//         <div className="first-input">
		//           <h3>Username</h3>
		//           <input type="email"
		//             name="email"
		//             className="loginInput"
		//             placeholder="Username"
		//             value={formValues.email}
		//             onChange={handleChange}
		//           />
		//           <p className='errorMsgs'>{formErrors.email}</p>
		//         </div>

		//         <div className="second-input">
		//           <h3>Password</h3>
		//           <input type="password"
		//             name="password"
		//             className="loginInput"
		//             placeholder="Password"
		//             value={formValues.password}
		//             onChange={handleChange}
		//           />
		//           <p className='errorMsgs'>{formErrors.password}</p>
		//         </div>
		//         <button className='loginbtn' >Login</button>
		//         <div className="third-input">
		//           <Link to='/SignUp'>Register Now</Link> |
		//           <Link to='/ForgotPassword'>Forgot Password</Link>
		//         </div>
		//       </form>
		//     </div>
		//   </div>
		// </div>

		<div className="hero min-h-[90%] bg-base-200 font-pop">
			<div className="hero-content flex flex-col lg:flex-row items-center justify-between">
				<div className="text-center lg:text-right">
					<h1 className="font-bold text-5xl text-primary">BANKEROST.</h1>
					<h1 className="p-1">Website green like money</h1>
				</div>
				<div className="card flex-shrink-0 w-[23rem] shadow-2xl bg-base-100">
					<div className="card-body gap-4">
						<h1 className="font-bold text-2xl">Login</h1>
						<form onSubmit={handleSubmit} className="flex flex-col">
							<div className="w-full">
								<h3>Username</h3>
								<input
									type="email"
									name="email"
									className="input input-bordered w-full"
									placeholder="Username"
									value={formValues.email}
									onChange={handleChange}
								/>
								<p className="errorMsgs">{formErrors.email}</p>
							</div>

							<div className="w-full">
								<h3>Password</h3>
								<input
									type="password"
									name="password"
									className="input input-bordered w-full"
									placeholder="Password"
									value={formValues.password}
									onChange={handleChange}
								/>
								<p className="errorMsgs">{formErrors.password}</p>
							</div>
							<button
								className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end"
								type="submit"
							>
								Login
							</button>
						</form>
					</div>
					<Link to="/SignUp">
						<p className="text-xs text-center p-1">No Account? Sign up</p>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
