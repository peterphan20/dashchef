import React from "react";

const MenuButtonDesktop = ({ clickHandler, placeholder, icon }) => {
	return (
		<>
			<button
				className="flex flex-row justify-center items-start gap-2 text-base font-headers font-semibold  hover:text-blue-600"
				onClick={clickHandler}
			>
				{placeholder}
				<i className={icon}></i>
			</button>
		</>
	);
};

export default MenuButtonDesktop;
