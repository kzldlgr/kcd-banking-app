import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../../../../context/AdminContext";

export default function Buttons({ text, path, onMouseClick, children, image, badgeOn }) {
	const [isBadgeOn, setIsBadgeOn] = useState(false);
	const { userRequest } = useContext(AdminContext);

	const customBadge = {
		display: 'flex',
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		top: '-8px',
		right: '-8px',
		backgroundColor: 'rgb(2, 90, 90)',
		height: '25px',
		width: '25px',
		borderRadius: '50%'
	}
	
	useEffect(() => {
		setIsBadgeOn(badgeOn);
	}, [userRequest]);

	return text === "Logout" ? (
		<Link to={path} className="w-full">
			<div
				className="flex items-center gap-3 font-pop justify-end hover:bg-base-100 w-full px-4 py-2 transition-all text-base-100 hover:text-black relative"
				onClick={onMouseClick}
			>
				<p>{text}</p>
				<div className="relative">{image}</div>
				{children}
			</div>
		</Link>
	) : (
		<Link to={path} className="w-full">
			<div
				className="flex items-center gap-3 font-pop justify-end hover:bg-base-100 w-full px-4 py-2 transition-all text-base-100 hover:text-black relative"
				onClick={onMouseClick}
			>
				<div className="relative">
					{image}
					{isBadgeOn && userRequest.length !== 0 && (
						<span className="custom-badge text-base-100" style={customBadge}>
							<span>{userRequest.length}</span>
						</span>
					)}
				</div>
				<p>{text}</p>
				{children}
			</div>
		</Link>
	);
}
