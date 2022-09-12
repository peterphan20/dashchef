import React from "react";
import { Link } from "react-router-dom";

const LinkProfileDesktop = ({ link, className, clickHandler, placeholder }) => {
	return (
		<>
			<Link
				to={link}
				className={`text-sm rounded-md py-2 px-10 ${className}`}
				onClick={clickHandler}
			>
				{placeholder}
			</Link>
		</>
	);
};

export default LinkProfileDesktop;
