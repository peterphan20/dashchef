import React from "react";
import { Link } from "react-router-dom";

const MenuAnchorDesktop = ({ link, clickHandler, placeholder, icon }) => {
	return (
		<>
			<Link
				to={link}
				className="flex flex-row justify-center items-start gap-2 text-sm font-headers font-semibold  hover:text-blue-600"
				onClick={clickHandler}
			>
				{placeholder}
				<i className={icon}></i>
			</Link>
		</>
	);
};

export default MenuAnchorDesktop;
