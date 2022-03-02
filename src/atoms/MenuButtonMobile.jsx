import React from "react";

const MenuButtonMobile = ({ clickHandler, placeholder }) => {
	return (
		<>
			<button
				className="flex justify-start items-center gap-3 font-semibold text-gray-900 border-b border-gray-300 px-2 mb-4 w-full"
				onClick={clickHandler}
			>
				{placeholder}
			</button>
		</>
	);
};

export default MenuButtonMobile;
