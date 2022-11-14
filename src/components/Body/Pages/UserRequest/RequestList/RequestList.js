import React from "react";
import { Link } from "react-router-dom";
import Check from "../../../../../assets/icons/check.png";
import Delete from "../../../../../assets/icons/deleteicon.png";

export default function RequestList({ userinfo, handleApprove, index, deleteFunc }) {
	return (
		<tr className="cursor-pointer" onClick={handleApprove}>
			<th>{index}</th>
			<td>{userinfo.firstname}</td>
			<td>{userinfo.lastname}</td>
			<td>{userinfo.myaddress}</td>
			<td>{userinfo.mymobileno}</td>
			<td >{userinfo.myemail}</td>
			<td className="flex items-center gap-5" >
				<Link to="/Bankerostmain/AddClient" className="btn btn-ghost" >
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</Link>
				<button className="btn btn-ghost" onClick={() => deleteFunc(userinfo.myemail)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
			</td>
		</tr>
	);
}
