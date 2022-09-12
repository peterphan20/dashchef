import React from "react";

const ButtonProfileDesktop = ({ className, clickHandler, placeholder, disabled }) => {
	return (
		<button
			className={`flex justify-center items-center text-sm rounded py-2 px-10 ${className}`}
			onClick={clickHandler}
			disabled={disabled}
		>
			{placeholder}
		</button>
	);
};

export default ButtonProfileDesktop;
