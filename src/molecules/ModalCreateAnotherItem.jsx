import { useSelector } from "react-redux";
import LinkModal from "../atoms/LinkModal";

const ModalCreateAnotherItem = ({ modalHandler, handleCreateAnotherMenuItem }) => {
	const user = useSelector((state) => state.userReducer);

	return (
		<div
			className="grid place-items-center fixed bg-backdrop top-0 left-0 px-4 w-full h-screen z-20"
			onMouseDown={() => modalHandler(false)}
		>
			<div
				onMouseDown={(e) => e.stopPropagation()}
				className="relative bg-gray-200 text-gray-900 rounded shadow p-12 mb-40 z-20"
			>
				<h1 className="font-text font-bold text-2xl mb-5 w-full">
					Create another item?
				</h1>
				<div className="flex gap-3">
					<LinkModal
						link={`/kitchen/${user.kitchenID}`}
						className="bg-gray-300"
						placeholder="No"
						clickHandler={() => modalHandler(false)}
					/>
					<LinkModal
						link="/create/menu-item"
						className="bg-green-400"
						placeholder="Yes"
						clickHandler={handleCreateAnotherMenuItem}
					/>
				</div>
			</div>
		</div>
	);
};

export default ModalCreateAnotherItem;
