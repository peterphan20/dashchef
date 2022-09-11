import React from "react";

const MenuButtonDesktop = ({ clickHandler, placeholder }) => {
	return (
		<button
			className="flex flex-row justify-center items-start gap-2 text-base font-headers font-semibold hover:text-blue-500"
			onClick={clickHandler}
		>
			{placeholder}
		</button>
	);
};

export default MenuButtonDesktop;
