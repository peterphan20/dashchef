import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonUserAuthForm = ({ clickHandler, text, className = "", icon }) => {
	return (
		<>
			<button
				className={`${className} flex justify-center items-center gap-1 text-gray-100 text-sm rounded-lg py-1 px-2 w-20 h-full`}
				onClick={clickHandler}
			>
				{text}
				<FontAwesomeIcon icon={icon} className="text-xs" />
			</button>
		</>
	);
};

export default ButtonUserAuthForm;
