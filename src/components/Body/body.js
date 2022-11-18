import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "./Sidebar/sidebar";
import Dashboard from "./Dashboard/dashboard";
import Expenses from "./Pages/Expenses/Expenseschart";
import Searchpage from "./Pages/Searchpage/Search";
import Tablist from "./Tablist/Tablist";
import { AdminContext } from "../../context/AdminContext";

import "./body.css";

export default function Body() {
	const user = JSON.parse(sessionStorage.getItem("user"));
	const { isToggled, setIsToggled } = useContext(AdminContext);

	if (user.usertype !== "admin") {
		return (
			<div className="mainbody">
				<Dashboard>
					<Expenses />
					<div className="divider"></div>
					<Tablist />
					<Outlet />
				</Dashboard>
				<Sidebar />
			</div>
		);
	} else {
		return (
			<div className="mainbody">
				{isToggled && <Searchpage />}
				{!isToggled && (
					<>
						<Dashboard>
							<Tablist userlevel={user.usertype} />
							<Outlet />
						</Dashboard>
					</>
				)}
				<Sidebar userlevel="admin" />
			</div>
		);
	}
}
