import React from "react";

const ButtonSignup = ({ clickHandler, text, className = "", buttonIcon = "" }) => {
	return (
		<>
			<button
				className={`flex justify-center items-center gap-1 ${className} text-gray-100 text-sm rounded-lg py-1 px-2 w-20 h-full`}
				onClick={clickHandler}
			>
				{text}
				<i className={`${buttonIcon} text-xs`}></i>
			</button>
		</>
	);
};

export default ButtonSignup;
