import React from "react";
import { Link } from "react-router-dom";

const LinkModal = ({ link, className, clickHandler, placeholder }) => {
	return (
		<>
			<Link
				to={link}
				className={`${className} text-gray-900 text-base rounded-lg py-1 px-6 lg:text-lg lg:px-8`}
				onClick={clickHandler}
			>
				{placeholder}
			</Link>
		</>
	);
};

export default LinkModal;
