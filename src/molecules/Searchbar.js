import React from "react";

const Searchbar = () => {
	return (
		<div className="px-3 w-full h-full lg:w-96">
			<input
				id="searchbar"
				type="text"
				className="bg-gray-50 text-gray-900 rounded border border-gray-300 shadow-xl outline-none py-3 pl-3 pr-5 w-full h-full transform -translate-y-1/2 lg:transform-none lg:rounded-full lg:py-2"
				placeholder="Search for home chefs"
			/>
		</div>
	);
};

export default Searchbar;
