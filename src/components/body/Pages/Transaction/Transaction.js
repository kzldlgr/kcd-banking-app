import React, { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../../../context/UsersContext";
import "./Transaction.css";

export default function Transaction({ children }) {
	const { users, setUsers, userInfo, setUserInfo } = useContext(UsersContext);
	const [transaction, setTransaction] = useState([]);
	const currentUser = JSON.parse(sessionStorage.getItem("user"));

	useEffect(() => {
		if (currentUser.usertype === "user") {
			const newUser = users.find((user) => user.myemail === currentUser.myemail);

			setTransaction(
				newUser.myhistory.map((e, index) => (
					<tr key={index}>
						<td>{e.date}</td>
						<td>{e.description}</td>
						<td>
							{Number(e.amount).toLocaleString("tl-PH", { style: "currency", currency: "PHP" })}
						</td>
					</tr>
				))
			);
		} else if (currentUser.usertype === "admin") {
			console.log(userInfo);
			if (userInfo !== undefined && userInfo.length !== 0) {
				setTransaction(
					userInfo.myhistory.map((e, index) => (
						<tr key={index}>
							<td>{e.date}</td>
							<td>{e.description}</td>
							<td>
								{Number(e.amount).toLocaleString("tl-PH", { style: "currency", currency: "PHP" })}
							</td>
						</tr>
					))
				);
			}
		}
	}, [users]);

	return (
		<div className="overflow-x-auto min-h-[20rem] bg-base-100 rounded-md">
			<table className="table table-compact w-full">
				<thead>
					<tr>
						<th>DATE</th>
						<th>DESCRIPTION</th>
						<th>AMOUNT</th>
					</tr>
				</thead>

				<tbody>{transaction}</tbody>
			</table>
		</div>
	);
}
