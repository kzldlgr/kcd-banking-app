import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { UsersContext } from "../../context/UsersContext";
import swal from "sweetalert";

function SignUp() {
	let storageRequest = JSON.parse(localStorage.getItem("userrequest"));
	let navigate = useNavigate();
	const [details, setDetails] = useState([]);
	const { users } = useContext(UsersContext);
	const current = new Date();
	const [formErrors, setFormErrors] = useState({});
	const { setUserRequest } = useContext(AdminContext);
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (details === undefined || details.length === 0) return;
		setUserRequest((account) => [...account, { ...details }]);
	}, [details]);

	const validate = (data) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		let invalidUser = users.find((invalidUser) => invalidUser.myemail.toLowerCase() === data.myemail.toLowerCase());
		let invalidName = users.find((invalidName) => invalidName.firstname.toLowerCase() === data.firstname.toLowerCase() && invalidName.lastname.toLowerCase() === data.lastname.toLowerCase())
		let invalidUserRequest = storageRequest.find((invalidUserRequest) => invalidUserRequest.myemail.toLowerCase() === data.myemail.toLowerCase());
		let invalidNameRequest = storageRequest.find((invalidNameRequest) => invalidNameRequest.firstname.toLowerCase() === data.firstname.toLowerCase() && invalidNameRequest.lastname.toLowerCase() === data.lastname.toLowerCase())
		if (invalidName !== undefined || invalidNameRequest !== undefined) {
			errors.firstname = "Name already exists";
		} else if (invalidUser !== undefined || invalidUserRequest !== undefined) {
			errors.myemail = "Email already exists";
		} else if (!regex.test(data.myemail)) {
			errors.email = "This is not a valid email format!";
		} else {
			setDetails({
				...data,
				usertype: "user",
				myhistory: [],
				cardnum: "",
				transfer: [],
				balance: 0,
			});

			reset({
				firstname: "",
				lastname: "",
				myaddress: "",
				mymobileno: "",
				myemail: "",
				mypassword: "",
			});
			swal({
				text: "Successfully created an account!",
				icon: "success",
				button: true,
			}).then((willDelete) => {
				if (willDelete) {
					navigate("/", { replace: true });
					swal("Account will be review and approve by admin", {
						icon: "success",
					});
				}
			});
		}
		return errors
	};

	const onSubmit = (data) => {
		setFormErrors(validate(data));

	};

	return (
		<div className="hero bg-base-200 font-pop">
			<div className="hero-content flex flex-col lg:flex-row items-center justify-between">
				<div className="text-center lg:text-right">
					<h1 className="font-bold text-5xl text-primary">BANKEROST.</h1>
					<h1 className="p-1">Website green like money</h1>
				</div>
				<div className="card flex-shrink-0 w-[33rem] shadow-2xl bg-base-100">
					<div className="card-body gap-4">
						<h1 className="font-bold text-2xl">Sign Up</h1>

						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
							<div>
								<label>First Name:</label>
								<input
									className="input input-bordered w-full"
									{...register("firstname", {
										required: "First name is required.",
									})}
									type="text"
									placeholder="Enter your First Name"
								/>
								<p className="italic font-light text-red-600 text-sm">
									{errors.firstname?.message}
								</p>
								<p className="text-red-500">{formErrors.firstname}</p>
							</div>

							<div>
								<label>Last Name:</label>
								<input
									className="input input-bordered w-full"
									{...register("lastname", {
										required: "Last name is required.",
									})}
									type="text"
									placeholder="Enter your Last Name"
								/>
								<p className="italic font-light text-red-600 text-sm">
									{errors.lastname?.message}</p>
							</div>
							<div>
								<label>Address:</label>
								<input
									className="input input-bordered w-full"
									{...register("myaddress", {
										required: "Address is required.",
									})}
									type="text"
									placeholder="Enter your current Address"
								/>
								<p className="italic font-light text-red-600 text-sm">
									{errors.myaddress?.message}
								</p>
							</div>

							<div>
								<label>Mobile No.:</label>
								<input
									className="input input-bordered w-full"
									{...register("mymobileno", {
										required: "Mobile no. is required.",
									})}
									type="number"
									maxLength="11"
									placeholder="Enter your Mobile No."
								/>
								<p className="italic font-light text-red-600 text-sm">
									{errors.mymobileno?.message}
								</p>
							</div>
							<div>
								<label>Email:</label>
								<input
									className="input input-bordered w-full"
									{...register("myemail", {
										required: "Email is required.",
									})}
									type="email"
									placeholder="Enter your Email"
								/>
								<p className="italic font-light text-red-600 text-sm">{errors.myemail?.message}</p>
								<p className="text-red-500">{formErrors.myemail}</p>
							</div>
							<div>
								<label>Password:</label>
								<input
									className="input input-bordered w-full"
									{...register("mypassword", {
										required: "Password is required.",
										minLength: {
											value: 8,
											message: "Minimum length is 8",
										},
										maxLength: {
											value: 32,
											message: "Maximum length is 32",
										},
									})}
									type="password"
									placeholder="Enter your Password"
								/>
								<p className="italic font-light text-red-600 text-sm">
									{errors.mypassword?.message}
								</p>
							</div>
							<p className="text-xs font-light mt-4">
								By creating an account you agree to our <Link to="/">Terms & Privacy</Link>.
							</p>
							<button
								className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end"
								type="submit"
							>
								Sign Up
							</button>
						</form>
					</div>
					<Link to="/">
						<p className="text-xs text-center p-1">Already Have an Account? Login</p>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
