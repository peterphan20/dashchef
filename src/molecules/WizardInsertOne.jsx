import FormInputField from "../molecules/FormInputField";

const WizardInsertOne = ({ setIsSignupOpen, email, setEmail, password, setPassword }) => {
	return (
		<>
			<button className="flex self-end text-gray-400" onMouseDown={() => setIsSignupOpen(false)}>
				<i className="fa-solid fa-xmark" />
			</button>
			<h1 className="text-left text-3xl font-accent font-extrabold text-gray-900 mt-5 mb-8">
				Sign up for Dashchef
			</h1>
			<div className="rounded-md -space-y-px">
				<FormInputField
					htmlFor="email-address"
					text="email"
					type="email"
					placeholder="Email Address"
					value={email}
					changeHandler={(e) => setEmail(e.target.value)}
				/>
				<FormInputField
					htmlFor="password"
					text="password"
					type="password"
					placeholder="Password"
					value={password}
					changeHandler={(e) => setPassword(e.target.value)}
				/>
			</div>
		</>
	);
};

export default WizardInsertOne;
