import React from "react";

const Dropdown = ({ id, options, onSelectedChange, className = "" }) => {
	const renderedOptions = options.map((option, idx) => {
		return (
			<>
				<option key={idx} value={option.value}>
					{option.title}
				</option>
			</>
		);
	});

	return (
		<>
			<select
				key={options.value}
				className={`rounded-none relative block w-full pl-2 py-2 border border-gray-300 text-gray-500 rounded-md ${className} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
				defaultValue={options[0]}
				onChange={onSelectedChange}
			>
				{renderedOptions}
			</select>
		</>
	);
};

export default Dropdown;
