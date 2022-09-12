import React from "react";
import { Link } from "react-router-dom";

const LinkProfileDesktop = ({ link, className, clickHandler, placeholder }) => {
	return (
		<>
			<Link
				to={link}
				className={`flex justify-center items-center text-sm rounded py-2 px-10 ${className}`}
				onClick={clickHandler}
			>
				{placeholder}
			</Link>
		</>
	);
};

export default LinkProfileDesktop;
