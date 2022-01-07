import React from "react";
import { Link } from "react-router-dom";

const LinkProfileDesktop = ({ link, className, placeholder }) => {
	return (
		<>
			<Link to={link} className={`text-base rounded-md py-2 px-10 ${className}`}>
				{placeholder}
			</Link>
		</>
	);
};

export default LinkProfileDesktop;
