import React from "react";

const ButtonSignup = ({ toggleModalHandler, text, className = "", buttonIcon = "" }) => {
	return (
		<>
			<button
				className={`flex justify-center items-center gap-1 ${className} text-gray-100 text-sm rounded-lg py-1 px-2 w-20 h-full`}
				onClick={toggleModalHandler}
			>
				{text}
				<i className={`${buttonIcon} text-xs`}></i>
			</button>
		</>
	);
};

export default ButtonSignup;
