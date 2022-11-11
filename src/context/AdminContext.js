import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext({});

export const AdminContextProvider = ({ children }) => {
	const [userRequest, setUserRequest] = useState(
		localStorage.getItem("userrequest") === null
			? localStorage.setItem("userrequest", JSON.stringify([]))
			: []
	);
	sessionStorage.getItem("user") === null
		? sessionStorage.setItem("user", JSON.stringify({}))
		: JSON.parse(sessionStorage.getItem("user"));

	const [requestInfo, setRequestInfo] = useState([]);

	const [isToggled, setIsToggled] = useState(true);

	useEffect(() => {
		setUserRequest(JSON.parse(localStorage.getItem("userrequest")));
	}, []);

	useEffect(() => {
		setIsToggled(isToggled);
	}, [isToggled]);

	useEffect(() => {
		localStorage.setItem("userrequest", JSON.stringify(userRequest));
	}, [userRequest]);

	return (
		<AdminContext.Provider
			value={{ userRequest, setUserRequest, isToggled, setIsToggled, requestInfo, setRequestInfo }}
		>
			{children}
		</AdminContext.Provider>
	);
};
