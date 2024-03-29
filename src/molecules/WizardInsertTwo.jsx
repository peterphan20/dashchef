import FormInputField from "../molecules/FormInputField";

const WizardInsertTwo = ({
	setIsSignupOpen,
	firstName,
	setFirstName,
	lastName,
	setLastName,
	setIsChef,
}) => {

	return (
		<>
			<button
				className="flex self-end text-sm text-gray-400"
				onMouseDown={() => setIsSignupOpen(false)}
			>
				<i className="fa-solid fa-xmark" />
			</button>
			<h1 className="text-left text-3xl font-accent font-extrabold text-gray-900 mt-5 mb-8">
				Sign up for Dashchef
			</h1>
			<div className="rounded-md -space-y-px mb-5">
				<FormInputField
					htmlFor="firstname"
					text="firstname"
					type="text"
					placeholder="First Name"
					value={firstName}
					changeHandler={(e) => setFirstName(e.target.value)}
				/>
				<FormInputField
					htmlFor="lastname"
					text="lastname"
					type="text"
					placeholder="Last Name"
					value={lastName}
					changeHandler={(e) => setLastName(e.target.value)}
				/>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">Are you a chef?</label>
					<select
						className="relative block rounded-none w-full pl-2 py-2 mb-3 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
						name="isChef"
						defaultValue=""
						onChange={(e) => setIsChef(e.target.value)}
					>
						<option value="">Are you a chef?</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
			</div>
		</>
	);
};

export default WizardInsertTwo;
