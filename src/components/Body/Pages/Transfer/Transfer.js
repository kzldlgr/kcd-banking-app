import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UsersContext } from "../../../../context/UsersContext";
import swal from "sweetalert";

export default function Transfer() {
	const [errorMessages, setErrorMessages] = useState("");
	const { users, setUsers, userBalance, setUserBalance, userInfo, setUserInfo } =
		useContext(UsersContext);
	const currentUser = JSON.parse(sessionStorage.getItem("user"));
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			input: {
				accountnum: userInfo.accountnum,
				firstname: userInfo.firstname,
				amount: userInfo.amount,
				purpose: userInfo.purpose,
				note: userInfo.note,
			},
		},
	});

	let transferTo;
	const newDate = new Date();

	const transferReceiverClient = (userdata, transferTo, data) => {
		if (userdata.accountnum === transferTo.accountnum) {
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

	const transferSenderClient = (userdata, transferTo, data) => {
		if (userdata.accountnum === currentUser.accountnum) {
			userdata.balance = Number(userdata.balance) - Number(data.amount);
			userdata.transfer.push(data);
			userdata.myhistory.push({
				date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
				description: `You transfered to ${transferTo.firstname} ${transferTo.lastname}`,
				type: "transfer",
				category: "",
				amount: data.amount,
			});
			setUserBalance(Number(userdata.balance));
		}
	};

	const transferReceiver = (userdata, data) => {
		if (userdata.accountnum === data.accountnumReceiver) {
			userdata.balance = Number(userdata.balance) + Number(data.input.amount);
			userdata.transfer.push(data);
			userdata.myhistory.push({
				date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
				description: `You received from ${userInfo.firstname} ${userInfo.lastname}`,
				type: "transfer",
				category: "",
				amount: data.input.amount,
			});
		}
	};

	const transferSender = (userdata, data) => {
		if (userdata.accountnum === data.input.accountnum) {
			userdata.balance = Number(userdata.balance) - Number(data.input.amount);
			userdata.transfer.push(data);
			userdata.myhistory.push({
				date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
				description: `You transfered to ${data.firstnameReceiver} ${data.lastnameReceiver}`,
				type: "transfer",
				category: "",
				amount: data.input.amount,
			});
			setUserBalance(userdata.balance);
		}
	};

	const checkUsers = (data, transferTo) => {
		users.forEach((user) => {
			if (currentUser.usertype === "admin") {
				transferReceiver(user, data);
				transferSender(user, data);
			} else if (currentUser.usertype === "user") {
				transferReceiverClient(user, transferTo, data);
				transferSenderClient(user, transferTo, data);
			}
		});
		localStorage.setItem("users", JSON.stringify(users));
		setUsers(users);

	};

	if (currentUser.usertype === "user") {
		return (
			<div className="p-5 w-full place-content-center font-pop bg-base-100 rounded-md">
				<form
					onSubmit={handleSubmit((data) => {
						transferTo = users.find((user) => user.accountnum === data.accountnum);

						transferTo === undefined
							? setErrorMessages("no user found")
							: userBalance >= data.amount
								? checkUsers(data, transferTo)
								: setErrorMessages("insufficient funds");

						reset({
							accountnum: "",
							accountname: "",
							amount: "",
							purpose: "",
							note: "",
						});
						
						swal({
							text: "Successfully transfered",
							icon: "success",
							button: "Done",
						});

					})}
					className="w-full flex flex-col mt-6 gap-2"
				>
					<div className="transferinput">
						<span>Account Number</span>
						<input
							type="number"
							{...register("accountnum")}
							className="input input-bordered w-full"
						/>
					</div>

					<div className="transferinput">
						<span>Account Name</span>
						<input {...register("firstname")} className="input input-bordered w-full" />
					</div>

					<div className="transferinput">
						<span>Amount</span>
						<input type="number" {...register("amount")} className="input input-bordered w-full" />
					</div>

					<div className="transferinput">
						<span>Purpose</span>
						<input {...register("purpose")} className="input input-bordered w-full" />
					</div>

					<div className="transferinput">
						<span>Note</span>
						<textarea {...register("note")} className="input input-bordered w-full" />
					</div>
					<p className="errorMsgs">{errorMessages}</p>
					<input className="btn btn-primary self-end mt-3" type="submit" value="Continue" />
				</form>
			</div>
		);
	} else {
		return (
			<div className="p-5 w-full place-content-center font-pop bg-base-100 rounded-md flex items-center gap-4">
				<form
					onSubmit={handleSubmit((data) => {
						data.accountnumReceiver === undefined
							? setErrorMessages("no user found")
							: Number(userInfo.balance) >= data.input.amount
								? checkUsers(data)
								: setErrorMessages("insufficient funds");
						swal({
							text: "Successfully transfered",
							icon: "success",
							button: "Done",
						});

						reset({
							accountnum: "",
							accountname: "",
							amount: "",
							purpose: "",
							note: "",
						});


					})}
					className="w-full flex flex-col mt-6 gap-2"
				>
					<div className="w-full">
						<span>Account Number</span>
						<input
							type="number"
							className="input input-bordered w-full"
							{...register("input.accountnum")}
						/>
					</div>

					<div className="transferinput">
						<span>Account Name</span>
						<input {...register("input.firstname")} className="input input-bordered w-full" />
					</div>

					<div className="transferinput">
						<span>Amount</span>
						<input
							type="number"
							{...register("input.amount")}
							className="input input-bordered w-full"
						/>
					</div>

					<div className="transferinput">
						<span>Purpose</span>
						<input {...register("input.purpose")} className="input input-bordered w-full" />
					</div>

					<div className="transferinput">
						<span>Note</span>
						<textarea {...register("input.note")} className="input input-bordered w-full" />
					</div>
					<p className="errorMsgs">{errorMessages}</p>
					<input className="btn btn-primary self-end mt-3" type="submit" value="Continue" />
				</form>

				<div className="transferDivider">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-14 h-14 animate-bounce"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</div>

				<form className="w-full flex flex-col mt-6 gap-2">
					<div className="transferinput">
						<span>Account Number</span>
						<input
							type="number"
							{...register("accountnumReceiver")}
							className="input input-bordered w-full"
						/>
					</div>

					<div className="transferinput">
						<span>First Name</span>
						<input {...register("firstnameReceiver")} className="input input-bordered w-full" />
					</div>

					<div className="transferinput">
						<span>Last Name</span>
						<input {...register("lastnameReceiver")} className="input input-bordered w-full" />
					</div>
				</form>
			</div>
		);
	}
}