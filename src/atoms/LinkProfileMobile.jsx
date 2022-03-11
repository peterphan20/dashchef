import React from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const LinkProfileMobile = ({ link, placeholder }) => {
	return (
		<>
			<Link
				to={link}
				className="flex justify-between items-center bg-gray-50 text-gray-900 text-lg border-b border-gray-300 py-4 px-3 w-full h-full"
			>
				{placeholder}
				{/* <FontAwesomeIcon icon={faChevronRight} /> */}
			</Link>
		</>
	);
};

export default LinkProfileMobile;
