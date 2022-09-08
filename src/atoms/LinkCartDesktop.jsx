import React from "react";
import { Link } from "react-router-dom";

const LinkCartDesktop = ({ link, className, clickHandler, placeholder }) => {
	return (
		<>
			<Link
				to={link}
				className={`flex justify-center items-center bg-red-600 text-gray-100 font-body font-bold text-sm rounded-full py-2 px-10 w-full ${className}`}
				onClick={clickHandler}
			>
				{placeholder}
			</Link>
		</>
	);
};

export default LinkCartDesktop;
