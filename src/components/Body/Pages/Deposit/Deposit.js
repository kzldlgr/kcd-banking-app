import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UsersContext } from "../../../../context/UsersContext";
import swal from "sweetalert";

export default function Deposit() {
	const newDate = new Date();
	const [amount, setAmount] = useState([]);
	const [balanceOutput, setBalanceOutput] = useState([]);
	const {
		register,
		formState: { errors },
	} = useForm();
	const { users, setUsers, userBalance, setUserBalance, userInfo, setUserInfo } =
		useContext(UsersContext);
	const currentUser = JSON.parse(sessionStorage.getItem("user"));

	let newUser;

	useEffect(() => {
		if (currentUser.usertype === "admin") {
			if (userInfo !== undefined && userInfo.length !== 0) {
				newUser = users.find((client) => client.myemail === userInfo.myemail);
				setBalanceOutput(Number(newUser.balance) + Number(amount));
			}
		} else if (currentUser.usertype === "user") {
			newUser = users.find((client) => client.myemail === currentUser.myemail);
			setBalanceOutput(Number(newUser.balance) + Number(amount));
		}
	}, [amount]);

	const clientSide = (client) => {
		if (client.myemail === currentUser.myemail) {
			client.myhistory.push({
				date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
				description: "deposit",
				amount: amount,
				category: "",
				type: "deposit",
			});
			client.balance = Number(client.balance) + Number(amount);
			localStorage.setItem("users", JSON.stringify(users));
			setUsers(users);
			setUserBalance(balanceOutput);
			setAmount("");
			return;
		}
	};

	const adminSide = (client) => {
		if (userInfo !== undefined && userInfo.length !== 0) {
			if (client.myemail === userInfo.myemail) {
				client.myhistory.push({
					date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
					description: "Deposit from Bankerost main",
					amount: amount,
					category: "",
					type: "deposit",
				});
				client.balance = Number(client.balance) + Number(amount);
				localStorage.setItem("users", JSON.stringify(users));
				setUsers(users);
				setUserBalance(balanceOutput);
				setAmount("");
				return;
			}
		}
	};

	const onHandleClick = (e) => {
		e.preventDefault();
		if (amount === "" || amount.length === 0) return;

		users.forEach((client) => {
			if (currentUser.usertype === "admin") {
				adminSide(client);
			} else if (currentUser.usertype === "user") {
				clientSide(client);
			}
		});
		swal({
			text: "You have successfully deposited",
			icon: "success",
			button: "Done",
		});
	};

	return (
		<div className="p-5 w-full place-content-center font-pop bg-base-100 rounded-md">
			<form className="w-full flex flex-col">
				<span className="font-bold text-lg">Deposit Amount: </span>
				<input
					type="number"
					{...register("amount")}
					maxLength={10}
					className="input input-bordered"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				></input>
				<p className="font-light text-sm">
					Balance: {balanceOutput.toLocaleString("tl-PH", { style: "currency", currency: "PHP" })}
				</p>
				<p className="italic text-red-600">{errors.amount?.message}</p>
				<button onClick={onHandleClick} className="btn btn-primary self-end">
					Confirm
				</button>
			</form>
		</div>
	);
}
