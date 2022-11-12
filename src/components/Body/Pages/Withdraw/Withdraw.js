import React, { useState, useEffect, useContext } from "react";
import { UsersContext } from "../../../../context/UsersContext";
import swal from "sweetalert";

export default function Withdraw({ children }) {
	const newDate = new Date();
	const { users, setUsers, userBalance, setUserBalance, userInfo, setUserInfo } =
		useContext(UsersContext);
	const [amount, setAmount] = useState([]);
	const [errorMsgs, setErrorMsgs] = useState("");
	const [balanceOutput, setBalanceOutput] = useState([]);
	const currentUser = JSON.parse(sessionStorage.getItem("user"));

	let newUser;

	useEffect(() => {
		if (currentUser.usertype === "admin") {
			if (userInfo !== undefined && userInfo.length !== 0) {
				newUser = users.find((client) => client.myemail === userInfo.myemail);
				setBalanceOutput(Number(newUser.balance) - Number(amount));
			}
		} else if (currentUser.usertype === "user") {
			newUser = users.find((client) => client.myemail === currentUser.myemail);
			setBalanceOutput(Number(newUser.balance) - Number(amount));
		}
	}, [amount]);

	const adminSide = (client) => {
		if (userInfo !== undefined && userInfo.length !== 0) {
			if (client.myemail === userInfo.myemail) {
				if (client.balance >= amount) {
					client.myhistory.push({
						date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
						description: "Withdraw from Bankerost main",
						amount: amount,
						category: "",
						type: "withdraw",
					});
					client.balance -= Number(amount);
					localStorage.setItem("users", JSON.stringify(users));
					setUsers(users);
					setUserBalance(balanceOutput);
					setAmount("");
					return;
				}
				return setErrorMsgs("Not Enough Cash");
			}
		}
	};

	const clientSide = (client) => {
		if (client.myemail === currentUser.myemail) {
			if (client.balance >= amount) {
				client.myhistory.push({
					date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
					description: "withdraw",
					amount: amount,
					category: "",
					type: "withdraw",
				});
				client.balance -= Number(amount);
				localStorage.setItem("users", JSON.stringify(users));
				setUsers(users);
				setUserBalance(balanceOutput);
				setAmount("");
				return;
			}
			return setErrorMsgs("Not Enough Cash");
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
			text: "You have successfully withdraw",
			icon: "success",
			button: "Done",
		});
	};

	return (
		<div className="p-5 w-full place-content-center font-pop bg-base-100 rounded-md">
			<form className="w-full flex flex-col">
				<span className="font-bold text-lg">Withdraw Amount: </span>
				<input
					type="number"
					maxLength={10}
					className="input input-bordered"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				></input>
				<p className="font-light text-sm">
					Balance: {balanceOutput.toLocaleString("tl-PH", { style: "currency", currency: "PHP" })}
				</p>
				<p className="italic text-red-600">{errorMsgs}</p>
				<button onClick={onHandleClick} className="btn btn-primary self-end">
					Confirm
				</button>
			</form>
		</div>
	);
}

// --OTP
// --Validation
