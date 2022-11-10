import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import Buttons from "../Body/Sidebar/Navbar/Buttons/buttons";

const Side = () => {
	const navigate = useNavigate();
	const { setIsToggled } = useContext(AdminContext);
	const user = JSON.parse(sessionStorage.getItem("user"));

	return user.usertype !== "admin" ? (
		<>
			<Buttons
				text="Deposit"
				path="/Bankerostmain/Deposit"
				image={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-[2rem] h-[2rem]"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
						/>
					</svg>
				}
			/>
			<Buttons
				text="Withdraw"
				path="/Bankerostmain/Withdraw"
				image={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-[2rem] h-[2rem]"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
						/>
					</svg>
				}
			/>
			<Buttons
				text="Send Money"
				path="/Bankerostmain/Transfer"
				image={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-[2rem] h-[2rem]"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
						/>
					</svg>
				}
			/>
			<Buttons
				text="Transaction"
				path="/Bankerostmain/Transaction"
				image={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-[2rem] h-[2rem]"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
						/>
					</svg>
				}
			/>
			<Buttons
				text="Expenses"
				path="/Bankerostmain/Expense"
				image={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-[2rem] h-[2rem]"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				}
			/>
		</>
	) : (
		<>
			<Buttons
				text="Search"
				path="/Bankerostmain/Admin"
				onMouseClick={() => {
					navigate("/Bankerostmain/Admin", { replace: true });
					setIsToggled(true);
				}}
				image={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-[2rem] h-[2rem]"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				}
			/>

			<Buttons
				text="Add Client"
				path="/Bankerostmain/AddClient"
				onMouseClick={() => {
					navigate("/Bankerostmain/AddClient", { replace: true });
					setIsToggled(false);
				}}
				image={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-[2rem] h-[2rem]"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				}
			/>

			<Buttons
				text="Request"
				path="/Bankerostmain/UserRequest"
				onMouseClick={() => {
					navigate("/Bankerostmain/UserRequest", { replace: true });
					setIsToggled(false);
				}}
				image={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-[2rem] h-[2rem]"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
						/>
					</svg>
				}
				badgeOn={true}
			/>

			<Buttons
				text="Transfer"
				path="/Bankerostmain/Transfer"
				onMouseClick={() => {
					navigate("/Bankerostmain/Transfer", { replace: true });
					setIsToggled(false);
				}}
				image={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-[2rem] h-[2rem]"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
						/>
					</svg>
				}
			/>
		</>
	);
};

export default Side;
