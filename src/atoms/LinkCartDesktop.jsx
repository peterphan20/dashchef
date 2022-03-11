import React from "react";
import { Link } from "react-router-dom";

const LinkCartDesktop = ({ link, className, clickHandler, placeholder }) => {
	return (
		<>
			<Link
				to={link}
				className={`flex justify-center items-center text-base rounded-md py-2 px-10 w-full ${className}`}
				onClick={clickHandler}
			>
				{placeholder}
			</Link>
		</>
	);
};

export default LinkCartDesktop;
