import React from "react";

const FormInputField = ({
	htmlFor,
	placeholder,
	text,
	type,
	autoComplete,
	value,
	changeHandler,
	className = "",
}) => {
	return (
		<div>
			<label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
				{placeholder}
			</label>
			<input
				id={htmlFor}
				name={text}
				type={type}
				autoComplete={autoComplete}
				required
				className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md ${className} focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
				value={value}
				onChange={changeHandler}
			/>
		</div>
	);
};

export default FormInputField;
