import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ButtonProfileMobile = ({ clickHandler, placeholder, className = "" }) => {
	return (
		<button
			className={`flex justify-between items-center bg-gray-50 text-gray-900 text-lg ${className} border-b border-gray-300 py-4 px-3 w-full h-full`}
			onClick={clickHandler}
		>
			{placeholder}
			<FontAwesomeIcon icon={faChevronRight} />
		</button>
	);
};

export default ButtonProfileMobile;
