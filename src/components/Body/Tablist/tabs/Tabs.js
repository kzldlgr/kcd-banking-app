import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Tabs({ text, path }) {
	const loc = useLocation();

	return (
		<NavLink
			to={path}
			className={`tab tab-xs tab-lifted ${
				loc.pathname.toLowerCase().includes(path.toLowerCase().split("/")[1])
					? "tab-active font-semibold"
					: ""
			}`}
		>
			{text}
		</NavLink>
	);
}
