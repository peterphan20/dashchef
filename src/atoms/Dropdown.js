import React from "react";

const Dropdown = ({ options, label, selected, onSelectedChange }) => {
	const renderedOptions = options.map((option) => {
		return (
			<option key={option.value} value={option.value}>
				{option.title}
			</option>
		);
	});

	return (
		<>
			<label htmlFor={label}>{label}</label>
			<select key={options.value} value={selected} onChange={onSelectedChange}>
				{renderedOptions}
			</select>
		</>
	);
};

export default Dropdown;
