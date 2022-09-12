import React from "react";

const ButtonProfileDesktop = ({ className, clickHandler, placeholder }) => {
	return (
		<button
			className={`flex justify-center items-center text-sm rounded py-2 px-10 ${className}`}
			onClick={clickHandler}
		>
			{placeholder}
		</button>
	);
};

export default ButtonProfileDesktop;
