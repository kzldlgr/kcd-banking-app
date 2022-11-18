import React from "react";
import { useLocation } from "react-router-dom";

export default function Dashboard({ children }) {
	const loc = useLocation();
	return loc.pathname.toLowerCase().includes("userrequest") ? (
		<div className="flex flex-col bg-white p-2 rounded-lg shadow-lg w-[72%]">{children}</div>
	) : (
		<div className="flex flex-col bg-white p-2 rounded-lg shadow-lg w-full">{children}</div>
	);
}
