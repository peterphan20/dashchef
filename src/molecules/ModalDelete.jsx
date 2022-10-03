import React from "react";

const ModalDelete = ({ modalHandler, placeholder, clickHandler }) => {
	return (
		<div
			className="grid place-items-center fixed bg-backdrop top-0 left-0 px-4 w-full h-screen z-20"
			onMouseDown={() => modalHandler(false)}
		>
			<div
				onMouseDown={(e) => e.stopPropagation()}
				className="relative flex flex-col justify-center items-start gap-1 bg-gray-50 text-gray-900 rounded-sm rounded shadow p-14 mb-40 z-20"
			>
				<h1 className="font-bold text-2xl w-full">Confirmation</h1>
				<h1 className="mb-2">{`Are you sure you want to delete this ${placeholder}?`}</h1>
				<div className="flex gap-3 pb-3">
					<button
						className="bg-gray-300 text-gray-900 text-sm rounded py-1 px-5"
						onClick={() => modalHandler(false)}
					>
						Cancel
					</button>
					<button
						className="bg-red-600 text-gray-200 text-sm rounded py-1 px-5"
						onClick={clickHandler}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalDelete;
