import React from "react";

const InputFieldLogin = ({
	placeholder,
	htmlFor,
	text,
	autoComplete,
	value,
	changeHandler,
	className = "",
}) => {
	return (
		<div>
			<label htmlFor={htmlFor} className="sr-only">
				{placeholder}
			</label>
			<input
				id={htmlFor}
				name={text}
				type={text}
				autoComplete={autoComplete}
				required
				className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${className} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
				placeholder={placeholder}
				value={value}
				onChange={changeHandler}
			/>
		</div>
	);
};

export default InputFieldLogin;
