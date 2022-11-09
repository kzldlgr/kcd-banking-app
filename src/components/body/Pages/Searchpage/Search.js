import React, { useState, useEffect, useContext } from "react";
import { UsersContext } from "../../../../context/UsersContext";
import Userlist from "./Userlist/Userlist";

export default function Search() {
	const { users, userBalance, setUsers, setUserBalance, userInfo, setUserInfo, setUserAccount } =
		useContext(UsersContext);
	const [names, setNames] = useState([]);
	const [inputList, setInputList] = useState([]);
	let searchUser, selectedUser;

	useEffect(() => {
		if (users === undefined) return;
		let namesToLowerCase = names.toString().toLowerCase();
		searchUser = users.filter(
			(user) =>
				user.firstname.toLowerCase() === namesToLowerCase ||
				user.lastname.toLowerCase() === namesToLowerCase ||
				user.myaddress.toLowerCase() === namesToLowerCase
		);
		displayUsers();
	}, [names]);

	useEffect(() => {
		console.log(userInfo);
	}, [userInfo]);

	const handleUserClick = (e) => {
		selectedUser = e.currentTarget.children[5].textContent;
		setUserBalance(selectedUser);
		setUserAccount(e.currentTarget.children[0].textContent);
		setUserInfo(
			users.find(
				(user) => user.accountnum.toString() === e.currentTarget.children[0].textContent.toString()
			)
		);
	};

	const displayUsers = () => {
		if (searchUser === undefined || searchUser.length === 0) {
			setInputList(
				users.map((user, index) => {
					if (user.usertype !== "admin") {
						return (
							<Userlist
								userinfo={user}
								index={index}
								handleUserClick={handleUserClick}
								key={index}
							/>
						);
					}
				})
			);
		} else {
			setInputList(
				searchUser.map((user, index) => {
					if (user.usertype !== "admin") {
						return (
							<Userlist
								userinfo={user}
								index={index}
								handleUserClick={handleUserClick}
								key={index}
							/>
						);
					}
				})
			);
		}
	};

	return (
		<div className="w-[72%] font-pop">
			<div className="flex gap-4 items-center mb-3">
				<h1 className="font-semibold text-lg">Search:</h1>
				<input
					type="text"
					className="input input-bordered"
					onChange={(e) => setNames(e.target.value)}
				></input>
			</div>

			<div className="max-h-[70vh] min-h-[70vh] relative w-full overflow-x-auto">
				<table className="table table-compact w-full m-auto">
					<thead>
						<tr>
							<th className="sticky top-0 px-6 py-3">Account #</th>
							<th className="sticky top-0 px-6 py-3">First Name</th>
							<th className="sticky top-0 px-6 py-3">Last Name</th>
							<th className="sticky top-0 px-6 py-3">Address</th>
							<th className="sticky top-0 px-6 py-3">Contact</th>
							<th className="sticky top-0 px-6 py-3">Balance</th>
							<th className="sticky top-0 px-6 py-3"></th>
						</tr>
					</thead>
					<tbody>{inputList}</tbody>
				</table>
			</div>
		</div>
	);
}
