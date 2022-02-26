import React from "react";

const ButtonFormSmall = ({ clickHandler, placeholder, className = "" }) => {
	return (
		<button
			className={`flex items-end text-gray-100 text-base rounded-md py-1 px-6 ${className}`}
			onClick={clickHandler}
		>
			{placeholder}
		</button>
	);
};

export default ButtonFormSmall;
