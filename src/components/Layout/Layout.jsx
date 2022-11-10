import Header from "../Head/Header";

const Layout = ({ children }) => {
	return (
		<div className="font-pop">
			<Header>{children}</Header>
		</div>
	);
};

export default Layout;
