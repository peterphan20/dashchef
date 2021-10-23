import React from "react";
import { Link } from "react-router-dom";

const MenuAnchorMobile = ({ link, clickHandler, icon, text }) => {
	return (
		<>
			<Link
				to={link}
				className="flex justify-start items-center gap-3 text-gray-900 border-b border-gray-300 px-2 mb-4 w-full"
				onClick={() => clickHandler()}
			>
				{text}
				<i className={`fas fa-${icon}`}></i>
			</Link>
		</>
	);
};

export default MenuAnchorMobile;
