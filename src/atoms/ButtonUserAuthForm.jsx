import React from "react";

const ButtonUserAuthForm = ({ clickHandler, text, className = "", icon }) => {
	return (
			<button
				className={`${className} flex justify-center items-center gap-1 text-gray-100 text-sm rounded-lg py-1 px-2 w-20 h-full`}
				onClick={clickHandler}
			>
				{text}
				<i className={`${icon} text-xs`} />
			</button>
	);
};

export default ButtonUserAuthForm;
