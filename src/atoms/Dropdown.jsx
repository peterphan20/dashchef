import React from "react";

const Dropdown = ({
	options,
	placeholder,
	htmlFor,
	select,
	onSelectedChange,
	guessValue,
	className = "",
}) => {
	const renderedOptions = options.map((option) => {
		return (
			<option key={option.value} value={option.value}>
				{option.title}
			</option>
		);
	});

	return (
		<div className="pr-40 lg:pr-0">
			<label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-2">
				{placeholder}
			</label>
			<select
				id={htmlFor}
				className={`relative block rounded-none w-full pl-2 py-2 mb-5 border border-gray-300 text-gray-500 rounded-md z-0 ${className} focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
				value={select}
				onChange={onSelectedChange}
			>
				{renderedOptions}
			</select>
		</div>
	);
};

export default Dropdown;
