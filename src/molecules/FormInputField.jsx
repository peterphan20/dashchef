import React from "react";

const FormInputField = ({
	gridSpan,
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
		<div className={`${gridSpan} w-full h-full`}>
			<label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-2">
				{placeholder}
			</label>
			<input
				id={htmlFor}
				name={text}
				type={type}
				autoComplete={autoComplete}
				required
				className={`relative block appearance-none text-gray-900 bg-gray-50 rounded-md rounded-none px-3 py-2 mb-5 border border-gray-300 placeholder-gray-500 w-full ${className} focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
				value={value}
				onChange={changeHandler}
			/>
		</div>
	);
};

export default FormInputField;
