import FormInputField from "./FormInputField";

const ModalEditNumber = ({ setEditNumberModal, phone, setPhone, updatePhoneNumber }) => {
	return (
		<div
			className="grid place-items-center fixed bg-backdrop top-0 left-0 px-4 w-full h-screen z-20"
			onMouseDown={() => setEditNumberModal(false)}
		>
			<div
				onMouseDown={(e) => e.stopPropagation()}
				className="relative bg-gray-200 text-gray-900 rounded shadow p-8 mb-40 z-20 lg:p-14"
			>
				<h1 className="font-text font-bold border-b border-gray-200 mb-2 w-full lg:text-3xl">
					Edit phone number
				</h1>
				<FormInputField
					id="phone-number"
					name="phone-number"
					type="text"
					placeholder="Phone Number"
					autoComplete="tel"
					value={phone}
					changeHandler={(e) => setPhone(e.target.value)}
					required
				/>
				<div className="flex gap-3 pb-3">
					<button
						className="bg-gray-300 text-gray-900 text-base rounded-lg py-1 px-3 lg:py-2 lg:px-6"
						onClick={() => setEditNumberModal(false)}
					>
						Cancel
					</button>
					<button
						className="bg-red-600 text-gray-200 text-base rounded-lg py-1 px-3 lg:py-2 lg:px-6"
						onClick={updatePhoneNumber}
					>
						Update
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalEditNumber;
