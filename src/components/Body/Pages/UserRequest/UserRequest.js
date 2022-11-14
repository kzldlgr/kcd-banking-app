import React, { useState, useEffect, useContext, useMemo } from "react";
import { AdminContext } from "../../../../context/AdminContext";
import RequestList from "./RequestList/RequestList";

export default function UserRequest() {
	const [inputList, setInputList] = useState([]);
	const [name, setName] = useState("");
	const { userRequest, requestInfo, setRequestInfo, setUserRequest } = useContext(AdminContext);
	let currentEmail;

	const handleApprove = (e) => {
		currentEmail = e.currentTarget.children[5].textContent;
		let selectedUser = userRequest.find((user) => currentEmail === user.myemail);
		setRequestInfo(selectedUser);
	};

	function deleteUser(email) {
		if (!email) return;

		const filteredUser = JSON.parse(localStorage.getItem("userrequest")).filter(
			(user) => user.myemail !== email
		);

		localStorage.setItem("userrequest", JSON.stringify(filteredUser));
		setRequestInfo(filteredUser);
		setUserRequest(filteredUser);
		console.log(requestInfo)

	}

	const filterUser = useMemo(() => {
		const users = userRequest;

		const filterFName = users.filter((user) =>
			user.firstname.toLowerCase().includes(name.toLowerCase())
		);

		const filterLName = users.filter((user) =>
			user.lastname.toLowerCase().includes(name.toLowerCase())
		);

		return name ? Array.from(new Set([...filterFName, ...filterLName])) : users;
	}, [name, userRequest]);

	return (
		<div className="w-[100%] font-pop bg-base-100 p-2 rounded-md">
			<div className="flex gap-4 items-center mb-3">
				<h1 className="font-semibold text-lg">Search:</h1>
				<input
					type="text"
					className="input input-bordered"
					onChange={(e) => setName(e.target.value)}
				></input>
			</div>

			<div className="max-h-[65vh] min-h-[65vh] relative w-full overflow-x-auto">
				<table className="table table-compact w-full m-auto">
					<thead>
						<tr>
							<th className="sticky top-0 px-6 py-3">Request #</th>
							<th className="sticky top-0 px-6 py-3">First Name</th>
							<th className="sticky top-0 px-6 py-3">Last Name</th>
							<th className="sticky top-0 px-6 py-3">Address</th>
							<th className="sticky top-0 px-6 py-3">Contact</th>
							<th className="sticky top-0 px-6 py-3">Email</th>
							<th className="sticky top-0 px-6 py-3"></th>
						</tr>
					</thead>
					<tbody>
						{filterUser.map((user, index) => (
							<RequestList
								userinfo={user}
								handleApprove={handleApprove}
								index={index + 1}
								key={index}
								deleteFunc={deleteUser}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
