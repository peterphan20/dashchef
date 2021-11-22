import React from "react";
import { Link } from "react-router-dom";

const MenuAnchorMobile = ({ link, clickHandler, placeholder, icon }) => {
	return (
		<>
			<Link
				to={link}
				className="flex justify-start items-end gap-3 text-gray-900 text-base border-b border-gray-300 px-2 mb-4 w-full"
				onClick={clickHandler}
			>
				{placeholder}
				<i className={icon}></i>
			</Link>
		</>
	);
};

export default MenuAnchorMobile;
