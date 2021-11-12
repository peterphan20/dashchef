import React from "react";

const ImageUploadSingle = ({ value, changeHandler, clickhandler }) => {
	return (
		<div className="flex justify-center bg-gray-50 text-gray-900 border-2 border-gray-300 border-dashed rounded-md mt-1 px-6 pt-5 pb-6">
			<div className="space-y-1 text-center">
				<i className="far fa-image text-4xl text-gray-400"></i>
				<div className="text-sm text-gray-600">
					<label
						htmlFor="file-upload"
						className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-blue-500"
					>
						<span>Upload a file</span>
						<input
							id="file-upload"
							name="file-upload"
							type="file"
							accept=".jpg, .jpeg, .png"
							className="sr-only"
							value={value}
							onChange={changeHandler}
						/>
					</label>
				</div>
				<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
				{value ? (
					<div className="flex items-center gap-5 bg-gray-200 py-1 px-2 rounded mt-10">
						<p className="text-sm">{value}</p>
						<button className="text-sm text-gray-400" onClick={() => clickhandler("")}>
							<i className="fas fa-times"></i>
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default ImageUploadSingle;
