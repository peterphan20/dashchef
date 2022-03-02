import React from "react";
import { Link } from "react-router-dom";

const MenuAnchorMobile = ({ link, clickHandler, placeholder }) => {
	return (
		<>
			<Link
				to={link}
				className="flex justify-start items-center gap-3 font-semibold text-gray-900 border-b border-gray-300 px-2 mb-4 w-full"
				onClick={clickHandler}
			>
				{placeholder}
			</Link>
		</>
	);
};

export default MenuAnchorMobile;
