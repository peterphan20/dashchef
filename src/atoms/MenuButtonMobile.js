import React from "react";

const MenuButtonMobile = ({ clickHandler, placeholder, icon }) => {
	return (
		<>
			<button
				className="flex justify-start items-center gap-3 text-gray-900 border-b border-gray-300 px-2 mb-4 w-full"
				onClick={clickHandler}
			>
				{placeholder}
				<i className={icon}></i>
			</button>
		</>
	);
};

export default MenuButtonMobile;
