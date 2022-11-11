import React, { useState, useEffect, useContext } from "react";
import { UsersContext } from "../../../../context/UsersContext";
import { useForm } from "react-hook-form";

export default function ManageUser() {
	const { users, setUsers, userInfo, setUserInfo } = useContext(UsersContext);

	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			input: {
				firstname: userInfo.firstname,
				lastname: userInfo.lastname,
				myaddress: userInfo.myaddress,
				mymobileno: userInfo.mymobileno,
				myemail: userInfo.myemail,
				mypassword: userInfo.mypassword,
			},
		},
	});

	const onSubmit = handleSubmit((data) => {
		console.log(data.input);
		users.forEach((client) => {
			if (client.accountnum === userInfo.accountnum) {
				client.firstname = data.input.firstname;
				client.lastname = data.input.lastname;
				client.myaddress = data.input.myaddress;
				client.mymobileno = data.input.mymobileno;
				client.myemail = data.input.myemail;
				client.mypassword = data.input.mypassword;
				localStorage.setItem("users", JSON.stringify(users));
				setUsers(users);
			}
		});
	});

	return (
		<div className="p-5 w-full place-content-center font-pop bg-base-100">
			<h1 className="font-bold text-2xl">Edit Client's Account</h1>

			<form onSubmit={onSubmit} className="w-full flex flex-col mt-6 gap-2">
				<div className="flex w-full gap-3">
					<div className="w-full">
						<label className="labels">First Name</label>
						<input
							{...register("input.firstname")}
							type="text"
							placeholder="First Name"
							className="input input-bordered w-full"
						></input>
					</div>

					<div className="w-full">
						<label className="labels">Last Name</label>
						<input
							{...register("input.lastname")}
							type="text"
							placeholder="Last Name"
							className="input input-bordered w-full"
						/>
					</div>
				</div>

				<div className="w-full">
					<label className="labels">Address</label>
					<input
						className="input input-bordered w-full"
						{...register("input.myaddress")}
						type="text"
						placeholder="Address"
					/>
				</div>

				<div className="w-full">
					<label className="labels">Contact</label>
					<input
						className="input input-bordered w-full"
						{...register("input.mymobileno")}
						type="text"
						placeholder="Contact"
					/>
				</div>

				<div className="w-full">
					<label className="labels">Email</label>
					<input
						className="input input-bordered w-full"
						{...register("input.myemail")}
						type="email"
						placeholder="Email"
					/>
				</div>

				<div className="w-full">
					<label className="labels">Password</label>
					<input
						className="input input-bordered w-full"
						{...register("input.mypassword", {
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
				</div>
				<p></p>
				<button className="btn btn-primary self-end mt-3">Proceed</button>
			</form>
		</div>
	);
}
