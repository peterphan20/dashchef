import React from "react";
import { Link } from "react-router-dom";

const LinkProfileMobile = ({ link, placeholder }) => {
	return (
		<>
			<Link
				to={link}
				className="flex justify-between items-center bg-gray-50 text-gray-900 text-lg border-b border-gray-300 py-4 px-3 w-full h-full"
			>
				{placeholder}
				<i className="fas fa-chevron-right text-gray-400"></i>
			</Link>
		</>
	);
};

export default LinkProfileMobile;
