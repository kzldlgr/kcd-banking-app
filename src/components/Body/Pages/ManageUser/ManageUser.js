import React, { useState, useEffect, useContext } from "react";
import { UsersContext } from "../../../../context/UsersContext";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

export default function ManageUser() {
	const { users, setUsers, userInfo, setUserInfo } = useContext(UsersContext);

	const { register, handleSubmit, setValue, formState: { errors } } = useForm({
		defaultValues: {
				firstname: userInfo.firstname,
				lastname: userInfo.lastname,
				myaddress: userInfo.myaddress,
				mymobileno: userInfo.mymobileno,
				myemail: userInfo.myemail,
				mypassword: userInfo.mypassword,
		},
	});

	const onSubmit = handleSubmit((data) => {
		users.forEach((client) => {
			if (client.accountnum === userInfo.accountnum) {
				client.firstname = data.firstname;
				client.lastname = data.lastname;
				client.myaddress = data.myaddress;
				client.mymobileno = data.mymobileno;
				client.myemail = data.myemail;
				client.mypassword = data.mypassword;
				localStorage.setItem("users", JSON.stringify(users));
				setUsers(users);
			}
		});
		swal({
			text: "Successfully updated a client info",
			icon: "success",
			button: "Done",
		});

	});

	return (
		<div className="p-5 w-full place-content-center font-pop bg-base-100">
			<h1 className="font-bold text-2xl">Edit Client's Account</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col mt-6 gap-2">
				<div className="flex w-full gap-3">
					<div className="w-full">
						<label className="labels">First Name</label>
						<input
							{...register("firstname", {required: "First Name is required"})}
							type="text"
							placeholder="First Name"
							className="input input-bordered w-full"
						/>
						<p className="italic font-light text-red-600 text-sm">
							{errors.firstname?.message}
						</p>
					</div>

					<div className="w-full">
						<label className="labels">Last Name</label>
						<input
							{...register("lastname", { required: 'Last Name is required' })}
							type="text"
							placeholder="Last Name"
							className="input input-bordered w-full"
						/>
						<p className="italic font-light text-red-600 text-sm">
							{errors.lastname?.message}
						</p>
					</div>
				</div>

				<div className="w-full">
					<label className="labels">Address</label>
					<input
						className="input input-bordered w-full"
						{...register("myaddress", { required: 'Address is required' })}
						type="text"
						placeholder="Address"
					/>
					<p className="italic font-light text-red-600 text-sm">
						{errors.myaddress?.message}
					</p>
				</div>

				<div className="w-full">
					<label className="labels">Contact</label>
					<input
						className="input input-bordered w-full"
						{...register("mymobileno")}
						type="text"
						placeholder="Contact"
					/>
				</div>

				<div className="w-full">
					<label className="labels">Email</label>
					<input
						className="input input-bordered w-full"
						{...register("myemail", {
							required: 'Email is required',
						})}
						type="email"
						placeholder="Email"
					/>
					<p className="italic font-light text-red-600 text-sm">
						{errors.myemail?.message}
					</p>
				</div>

				<div className="w-full">
					<label className="labels">Password</label>
					<input
						className="input input-bordered w-full"
						{...register("mypassword", {
							required: 'Password is required',
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
						placeholder="Password"
					/>
					<p className="italic font-light text-red-600 text-sm">
						{errors.mypassword?.message}
					</p>
					
				</div>
				<button className="btn btn-primary self-end mt-3">Proceed</button>
			</form>
		</div>
	);
}
