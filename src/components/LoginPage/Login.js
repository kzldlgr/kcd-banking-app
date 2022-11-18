import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UsersContext";

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
		let validUser = users.find((validUser) => validUser.myemail === values.email)
		if (!values.email) {
			errors.email = "Email is required.";
		} else if (!values.password) {
			errors.password = "Password is required.";
		} else if (!regex.test(values.email)) {
			errors.email = "This is not a valid email format!";
		} else if (values.password.length < 8) {
			errors.password = "Password must be more than 8 characters";
		} else if (validUser === undefined) {
			errors.email = "User does not exist";
		} else if (values.password !== validUser.mypassword) {
			errors.password = "Wrong password";
		} else {
			sessionStorage.setItem("user", JSON.stringify(validUser));
			validUser.usertype === 'admin'
			? navigate("/Bankerostmain/Admin", { replace: true })
			: navigate("/Bankerostmain/Transaction", { replace: true });
		}
		return errors;
	};

	return (
		<div className="hero min-h-[90%] bg-base-200 font-pop">
			<div className="hero-content flex flex-col lg:flex-row items-center justify-between">
				<div className="text-center lg:text-right">
					<h1 className="font-bold text-5xl text-primary">BANKEROST.</h1>
					<h1 className="p-1">Website green like money</h1>
				</div>
				<div className="card flex-shrink-0 w-[23rem] shadow-2xl bg-base-100">
					<div className="card-body gap-4">
						<h1 className="font-bold text-2xl">Login</h1>
						<form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
							<div className="w-full">
								<h3>Username</h3>
								<input
									type="text"
									name="email"
									className="input input-bordered w-full"
									placeholder="Username"
									value={formValues.email}
									onChange={handleChange}
								/>
								<p className="text-red-500">{formErrors.email}</p>
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
								<p className="text-red-600">{formErrors.password}</p>
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
