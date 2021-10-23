import React from "react";

const MenuButtonDesktop = ({ clickHandler, text, icon }) => {
	return (
		<>
			<button
				className="flex justify-start items-center gap-3 text-gray-900 border-b border-gray-300 px-2 mb-4 w-full"
				onClick={() => clickHandler()}
			>
				{text}
				<i className={`fas fa-${icon}`}></i>
			</button>
		</>
	);
};

export default MenuButtonDesktop;
