import React from "react";
import { useSelector } from "react-redux";
import LinkModal from "../atoms/LinkModal";

const ModalCreateAnotherItem = ({ setShowCreateAnotherItemModal }) => {
	const user = useSelector((state) => state.userReducer);

	return (
		<div className="grid place-items-center fixed bg-backdrop top-0 left-0 w-full h-screen z-20">
			<div className="relative bg-gray-200 text-gray-900 rounded shadow py-16 px-10 mb-28 z-20 lg:max-w-md">
				<h1 className="font-text font-bold text-2xl border-b border-gray-200 pb-2 mb-3 w-full lg:text-3xl lg:mb-8">
					Would you like to create another menu item?
				</h1>
				<div className="flex gap-5">
					<LinkModal
						link={`/kitchen/id/${user.kitchenID}`}
						className="bg-gray-300"
						placeholder="No"
						clickHandler={setShowCreateAnotherItemModal(false)}
					/>
					<LinkModal link="/create/menu-item" className="bg-green-400" placeholder="Yes" />
				</div>
			</div>
		</div>
	);
};

export default ModalCreateAnotherItem;
