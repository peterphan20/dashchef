import React from "react";
import { Link } from "react-router-dom";

const LinkModal = ({ link, className, clickHandler, placeholder }) => {
	return (
		<>
			<Link
				to={link}
				className={`${className} text-gray-900 text-sm rounded py-1 px-5`}
				onClick={clickHandler}
			>
				{placeholder}
			</Link>
		</>
	);
};

export default LinkModal;
