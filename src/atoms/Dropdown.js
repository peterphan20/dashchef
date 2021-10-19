import React from "react";

const Dropdown = ({ options, label, selected, onSelectedChange, className = "" }) => {
	const renderedOptions = options.map((option) => {
		return (
			<>
				<option key={option.value} value={option.value} selected>
					{option.title}
				</option>
			</>
		);
	});

	return (
		<>
			<label htmlFor={selected}>{label}</label>
			<select
				key={options.value}
				className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md ${className} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
				value={selected}
				onChange={onSelectedChange}
			>
				{renderedOptions}
			</select>
		</>
	);
};

export default Dropdown;
