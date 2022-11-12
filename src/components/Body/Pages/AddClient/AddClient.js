import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UsersContext } from "../../../../context/UsersContext";
import { AdminContext } from "../../../../context/AdminContext";
import swal from "sweetalert";

function AddClient() {
	const newDate = new Date();
	const { userRequest, setUserRequest, requestInfo, setRequestInfo, setIsToggled } =
		useContext(AdminContext);
	const { users, setUsers } = useContext(UsersContext);
	const [formErrors] = useState([]);
	const { register, reset, handleSubmit } = useForm({
		defaultValues: {
			firstname: requestInfo.firstname,
			lastname: requestInfo.lastname,
			myaddress: requestInfo.myaddress,
			mymobileno: requestInfo.mymobileno,
			myemail: requestInfo.myemail,
			mypassword: requestInfo.mypassword,
		},
	});

	const current = new Date();
	let lastAccount;
	let validEmail = false;

	function addNewClient(data) {
		if (data === undefined || data.length === 0) return;
		lastAccount = users[users.length - 1];
		setUsers((account) => [
			...account,
			{
				firstname: data.firstname,
				lastname: data.lastname,
				myaddress: data.myaddress,
				mymobileno: data.mymobileno,
				myemail: data.myemail,
				mypassword: data.mypassword,
				accountnum: Number(lastAccount.accountnum) + 1,
				myhistory: [
					{
						amount: data.amount,
						category: "",
						date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
						description: "initial deposit",
						type: "deposit",
					},
				],
				cardnum: Date.now(),
				transfer: [],
				balance: data.amount,
				usertype: "user",
			},
		]);
	}

	function removeUser() {
		let removeRequest = userRequest.filter((user) => user.myemail != requestInfo.myemail);
		localStorage.setItem("userrequest", JSON.stringify(removeRequest));
		setUserRequest(removeRequest);
		setRequestInfo({});
	}

	const onSubmit = (data) => {
		addNewClient(data);
		removeUser();
		reset({
			firstname: "",
			lastname: "",
			myaddress: "",
			myemail: "",
			mypassword: "",
			amount: "",
			mymobileno: "",
		});

		swal({
			text: "New user has been added",
			icon: "success",
			button: "Done",
		});
	};

	return (
		<div className="p-5 w-full place-content-center font-pop bg-base-100 rounded-md">
			<h1 className="font-bold text-2xl">New Client Account</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col mt-6 gap-2">
				<div className="flex w-full gap-3">
					<div className="w-full">
						<label className="labels">First Name:</label>
						<input
							type="text"
							className="input input-bordered w-full"
							placeholder="First Name"
							{...register("firstname", {
								required: "First name is required.",
							})}
						/>
					</div>

					<div className="w-full">
						<label className="labels">Last Name:</label>
						<input
							type="text"
							className="input input-bordered w-full"
							placeholder="Last Name"
							{...register("lastname", {
								required: "Last name is required.",
							})}
						/>
					</div>
				</div>

				<div className="w-full">
					<label className="labels">Address:</label>
					<input
						type="text"
						placeholder="Address "
						className="input input-bordered w-full"
						{...register("myaddress", {
							required: "Address is required.",
						})}
					/>
				</div>

				<div className="w-full">
					<label className="labels">Contact:</label>
					<input
						type="text"
						placeholder="Contact"
						pattern="^[1-9]\d*$"
						className="input input-bordered w-full"
						{...register("mymobileno", {
							required: "Mobile no. is required.",
						})}
					/>
				</div>

				<div className="w-full">
					<label className="labels">Initial Deposit:</label>
					<input
						type="number"
						placeholder="Initial Deposit"
						className="input input-bordered w-full"
						{...register("amount", {
							required: "Initial Deposit is required.",
						})}
					/>
				</div>

				<div className="w-full">
					<label className="labels">Email:</label>
					<input
						type="email"
						placeholder="Email"
						className="input input-bordered w-full"
						{...register("myemail", {
							required: "Email is required.",
						})}
					/>
					<p className="errorMsgs">{formErrors.myemail}</p>
				</div>

				<div className="w-full">
					<label className="labels">Password:</label>
					<input
						type="password"
						placeholder="Password"
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
					/>
				</div>

				<button className="btn btn-primary self-end mt-3">Add new client</button>
			</form>
		</div>
	);
}

export default AddClient;
