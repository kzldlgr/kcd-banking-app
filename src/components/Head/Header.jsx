import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo3.png";
import { AdminContext } from "../../context/AdminContext";
import Buttons from "../Body/Sidebar/Navbar/Buttons/buttons";
import Side from "./Side";

const Header = ({ children, loggedUser }) => {
	const user = JSON.parse(sessionStorage.getItem("user"));
	const { setIsToggled } = useContext(AdminContext);
	const navigate = useNavigate();
	
	return (
		<div className="drawer drawer-mobile ">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col w-full">
				{/* NAVBAR */}
				<div className="flex bg-primary p-3 items-center text-white justify-between">
					<div className="flex gap-3 items-center">
						<label for="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="#fff"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</label>
						<img src={logo} alt="logo" className="w-[3rem]" />
						<h1 className="font-bold text-3x1">Bankerost.</h1>
					</div>
					{user.usertype && (
						<div className="font-pop">{`Welcome ${user.lastname}, ${user.firstname}!`}</div>
					)}
				</div>
				{children}
			</div>
			{/* SIDEBAR */}
			{user.usertype && (
				<div className="drawer-side">
					<label for="my-drawer-2" className="drawer-overlay"></label>
					<ul className="w-[13rem] bg-primary text-base-content pt-[4.5rem] flex flex-col gap-5 overflow-visible">
						<Side />

						<div className="h-full flex items-end justify-self-end">
							<Buttons
								text="Logout"
								path="/"
								image={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-[1.5rem] h-[1.5rem]"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
										/>
									</svg>
								}
								onMouseClick={() => {
									navigate("/", { replace: true });
									setIsToggled(true);
									sessionStorage.setItem("user", JSON.stringify({}));
								}}
							/>
						</div>
					</ul>
				</div>
			)}
		</div>
	);
};

export default Header;
