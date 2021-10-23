import React from "react";

const MenuButtonMobile = ({ clickHandler, text, icon }) => {
	const debugClick = () => {
		console.log("Activating clickHandler: ", clickHandler)
		clickHandler()
	}

	return (
		<>
			<button
				className="flex justify-start items-center gap-3 text-gray-900 border-b border-gray-300 px-2 mb-4 w-full"
				onClick={() => debugClick()}
			>
				{text}
				<i className={`fas fa-${icon}`}></i>
			</button>
		</>
	);
};

export default MenuButtonMobile;
