import React, { useContext } from "react";
import Tabs from "./tabs/Tabs";
import { UsersContext } from "../../../context/UsersContext";

export default function Tablist({ userlevel }) {
	const { userInfo } = useContext(UsersContext);

	if (userlevel !== "admin") {
		return (
			<div className="tabs font-pop">
				<Tabs text="Transaction" path="./Transaction" />
				<Tabs text="Deposit" path="./Deposit" />
				<Tabs text="Withdraw" path="./Withdraw" />
				<Tabs text="Transfer" path="./Transfer" />
				<Tabs text="Expenses" path="./Expense" />
				<Tabs text="Paybill" path="./Paybill" />
			</div>
		);
	} else {
		return (
			<div className="tabs font-pop w-[45rem] ">
				{userInfo.firstname && <Tabs text="Edit User" path="./ManageUser" />}
				{userInfo.firstname && <Tabs text="Transaction" path="./Transaction" />}
				<Tabs text="Deposit" path="./Deposit" />
				<Tabs text="Withdraw" path="./Withdraw" />
				<Tabs text="Transfer" path="./Transfer" />
				<Tabs text="Add Client" path="./AddClient" />
				<Tabs text="Request" path="./UserRequest" />
			</div>
		);
	}
}
