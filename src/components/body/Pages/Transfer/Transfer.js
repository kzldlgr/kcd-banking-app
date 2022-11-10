import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UsersContext } from "../../../../context/UsersContext";
import "./transfer.css";

export default function Transfer() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [errorMessages, setErrorMessages] = useState("");
	const { users, setUsers, userBalance, setUserBalance } = useContext(UsersContext);
	const currentUser = JSON.parse(sessionStorage.getItem("user"));

	let transferTo;
	const newDate = new Date();

	const transferReceiver = (userdata, receiver, data) => {
		if (userdata.accountnum === receiver.accountnum) {
			userdata.balance = Number(userdata.balance) + Number(data.amount);
			userdata.transfer.push(data);
			userdata.myhistory.push({
				date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
				description: `You received from ${currentUser.firstname} ${currentUser.lastname}`,
				type: "transfer",
				category: "",
				amount: data.amount,
			});
		}
	};

	const transferSender = (userdata, receiver, data) => {
		if (userdata.accountnum === currentUser.accountnum) {
			userdata.balance = Number(userdata.balance) - Number(data.amount);
			userdata.transfer.push(data);
			userdata.myhistory.push({
				date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
				description: `You transfered to ${receiver.firstname} ${receiver.lastname}`,
				type: "transfer",
				category: "",
				amount: data.amount,
			});
			setUserBalance(userdata.balance);
		}
	};

	const checkUsers = (transferTo, data) => {
		users.forEach((user) => {
			transferReceiver(user, transferTo, data);
			transferSender(user, transferTo, data);

			localStorage.setItem("users", JSON.stringify(users));
			setUsers(users);
			setErrorMessages("Successfully Transfer the amount");
		});
	};

	return (
		<div className="p-5 w-full place-content-center bg-base-100 rounded-md">
			<h1 className="font-bold text-2xl mb-3">Transfer</h1>
			<form
				onSubmit={handleSubmit((data) => {
					transferTo = users.find((user) => user.accountnum === data.accountnum);

					transferTo === undefined
						? setErrorMessages("no user found")
						: userBalance >= data.amount
						? checkUsers(transferTo, data)
						: setErrorMessages("insufficient funds");

					reset({
						accountnum: "",
						accountname: "",
						amount: "",
						purpose: "",
						note: "",
					});
				})}
				className="w-full flex flex-col font-pop"
			>
				<div className="w-full flex flex-col">
					<span className=" ">Account Number:</span>
					<input className="input input-bordered" type="number" {...register("accountnum")} />
				</div>

				<div className="w-full flex flex-col">
					<span className=" ">Account Name:</span>
					<input className="input input-bordered" {...register("accountname")} />
				</div>

				<div className="w-full flex flex-col">
					<span className=" ">Amount:</span>
					<input className="input input-bordered" type="number" {...register("amount")} />
				</div>

				<div className="w-full flex flex-col">
					<span className=" ">Purpose:</span>
					<input className="input input-bordered" {...register("purpose")} />
				</div>

				<div className="w-full flex flex-col">
					<span className=" ">Note:</span>
					<textarea {...register("note")} className="textarea textarea-bordered" />
				</div>
				<p className="errorMsgs">{errorMessages}</p>
				<input className="btn btn-primary self-end mt-3" type="submit" value="Continue" />
			</form>
		</div>
	);
}
