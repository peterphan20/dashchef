import React from "react";

const ImageUploadSingle = ({
	fileInputHandler,
	fileIsSelected,
	selectedFile,
	clearSelectedFile,
}) => {
	return (
		<div
			className={`flex flex-col justify-center bg-gray-50 text-gray-900 rounded-md mt-1 px-6 pb-6 border-2 border-dashed ${
				!fileIsSelected ? "border-gray-300 pt-5" : "border-green-400 pt-3"
			}`}
		>
			{selectedFile ? (
				<button className="flex self-end text-gray-400 pb-2" onClick={clearSelectedFile}>
					<i className="fas fa-times"></i>
				</button>
			) : null}
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
							accept=".jpg,.jpeg,.png"
							className="sr-only"
							onChange={fileInputHandler}
						/>
					</label>
				</div>
				<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
			</div>
		</div>
	);
};

export default ImageUploadSingle;
