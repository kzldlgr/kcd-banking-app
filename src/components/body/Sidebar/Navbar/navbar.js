import React, { useContext, useEffect } from "react";
import { UsersContext } from "../../../../context/UsersContext";

export default function Navbar({ userlevel }) {
	const { users, userBalance, setUserBalance, userInfo, setUserAccount, userAccount } =
		useContext(UsersContext);
	const loginUser = JSON.parse(sessionStorage.getItem("user"));

	let usermatch;

	useEffect(() => {
		if (loginUser.usertype === "admin") {
			setUserBalance("0.00");
			setUserAccount("00000000");
		} else {
			usermatch = users.find((user) => user.myemail === loginUser.myemail);
			if (usermatch !== undefined && usermatch.usertype !== "admin") {
				setUserBalance(Number(usermatch.balance));
				setUserAccount(usermatch.accountnum);
			}
		}
	}, [users]);

	if (userlevel !== "admin") {
		return (
			<div className="bg-gradient-to-r from-[#11998e] to-[#19cf5f] w-[18rem] shadow-lg rounded-lg text-base-100 p-2 flex flex-col gap-[3.5rem] font-pop">
				<div>
					<p className="font-light text-xs">Account No.</p>
					<p className="text-lg font-semibold">{userAccount}</p>
				</div>
				<p className="self-end font-bold text-3xl">
					{userBalance.toLocaleString("tl-PH", { style: "currency", currency: "PHP" })}
				</p>
			</div>
		);
	} else {
		return (
			<>
				<div className="z-[4] bg-gradient-to-r from-[#11998e] to-[#19cf5f] w-[18rem] shadow-lg rounded-lg text-base-100 p-2 flex flex-col gap-[3.5rem] font-pop">
					<div>
						<p className="font-light text-xs">Account No.</p>
						<p className="text-lg font-semibold">{userAccount}</p>
					</div>

					<p className="self-end font-bold text-3xl">
						{userBalance.toLocaleString("tl-PH", { style: "currency", currency: "PHP" })}
					</p>
				</div>

				<div
					className={`font-light font-pop text-left w-full mt-2 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-2 pt-[2rem] transition-all ${
						userInfo.firstname ? "translate-y-[-2.3rem]" : "translate-y-[-100%]"
					} z-0`}
				>
					<p>
						Name:{" "}
						<span className="font-medium text-sm">
							{userInfo.firstname} {userInfo.lastname}
						</span>
					</p>
					<p>
						Email: <span className="font-medium text-sm">{userInfo.myemail}</span>
					</p>
					<p>
						Contact: <span className="font-medium text-sm">{userInfo.mymobileno}</span>
					</p>
					<p>
						Address: <span className="font-medium text-sm">{userInfo.myaddress}</span>
					</p>
				</div>
			</>
		);
	}
}
