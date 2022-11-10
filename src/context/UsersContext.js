import React, { createContext, useState, useEffect } from "react";
import usersDemoData from "../components/usersData";

export let UsersContext = createContext({});

export const UsersContextProvider = ({ children }) => {
	const [users, setUsers] = useState(
		localStorage.getItem("users") === null
			? localStorage.setItem("users", JSON.stringify(usersDemoData))
			: JSON.parse(localStorage.getItem("users"))
	);

	const [userBalance, setUserBalance] = useState("0.00");

	const [userAccount, setUserAccount] = useState("");

	const [userInfo, setUserInfo] = useState([]);

	const [loginUser, setLoginUser] = useState([]);

	const [searchView, setSearchView] = useState(true);

	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{
				label: "Expense",
				data: [],
				backgroundColor: ["#E97777"],
			},
		],
	});

	useEffect(() => {
		setUsers(JSON.parse(localStorage.getItem("users")));
	}, []);

	useEffect(() => {
		if (users !== undefined) {
			localStorage.setItem("users", JSON.stringify(users));
		}
	}, [users]);

	useEffect(() => {
		console.log(userInfo);
	}, [userInfo]);

	return (
		<UsersContext.Provider
			value={{
				users,
				setUsers,
				userBalance,
				setUserBalance,
				userInfo,
				setUserInfo,
				searchView,
				setSearchView,
				chartData,
				setChartData,
				loginUser,
				setLoginUser,
				userAccount,
				setUserAccount,
			}}
		>
			{children}
		</UsersContext.Provider>
	);
};
