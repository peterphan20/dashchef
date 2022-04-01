import React from "react";

const ModalEditNumber = ({modalHandler, clickHandler}) => {
	return (
		<div
			className="grid place-items-center fixed bg-backdrop top-0 left-0 px-4 w-full h-screen z-20"
			onClick={() => modalHandler(false)}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative bg-gray-200 text-gray-900 rounded shadow p-8 mb-40 z-20 lg:p-14"
			>
				<span className="font-text font-bold border-b border-gray-200 pb-2 mb-3 w-full lg:text-3xl">
					Edit phone number
				</span>
        <div>
          <label>Phone Number</label>
          <input />
        </div>
				<div className="flex gap-3 pb-3">
					<button
						className="bg-gray-300 text-gray-900 text-base rounded-lg py-1 px-3 lg:py-2 lg:px-6"
						onClick={() => modalHandler(false)}
					>
						Cancel
					</button>
					<button
						className="bg-red-600 text-gray-200 text-base rounded-lg py-1 px-3 lg:py-2 lg:px-6"
						onClick={clickHandler}
					>
						Update
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalEditNumber;
