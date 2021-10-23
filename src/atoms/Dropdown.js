import React from "react";

const Dropdown = ({ options, label, htmlFor, select, onSelectedChange, className = "" }) => {
	const renderedOptions = options.map((option) => {
		return (
			<option key={option.value} value={option.value}>
				{option.title}
			</option>
		);
	});

	return (
		<div>
			<label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<select
				key={options.value}
				id={htmlFor}
				className={`rounded-none relative block w-full pl-2 py-2 border border-gray-300 text-gray-500 rounded-md ${className} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
				defaultValue={select}
				onChange={onSelectedChange}
			>
				{renderedOptions}
			</select>
		</div>
	);
};

export default Dropdown;
