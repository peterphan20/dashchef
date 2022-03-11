import React from "react";

const ImageUploadMultiple = ({ value, changeHandler }) => {
	return (
		<div className="flex justify-center text-gray-900 border-2 border-gray-300 border-dashed rounded-md mt-1 px-6 pt-5 pb-6">
			<div className="space-y-1 text-center">
				<i className="fa-solid fa-image text-4xl text-gray-400" />
				<div className="flex text-sm text-gray-600">
					<label
						htmlFor="file-upload"
						className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
					>
						<span>Upload a file</span>
						<input
							id="file-upload"
							name="file-upload"
							type="file"
							accept=".jpg, .jpeg, .png"
							className="sr-only"
							multiple
							value={value}
							onChange={changeHandler}
						/>
					</label>
					<p className="pl-1">or drag and drop</p>
				</div>
				<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
			</div>
		</div>
	);
};

export default ImageUploadMultiple;
