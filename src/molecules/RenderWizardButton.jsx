import ButtonUserAuthForm from "../atoms/ButtonUserAuthForm";

const RenderWizardButton = ({ setIsSignupOpen, stepNumber, setStepNumber, handleSignup }) => {
	const renderButtons = () => {
		switch (true) {
			case stepNumber === 1:
				return (
					<div className="flex justify-between items-center mt-4">
						<ButtonUserAuthForm
							text="Cancel"
							className="text-gray-900 bg-gray-200"
							clickHandler={() => setIsSignupOpen(false)}
						/>
						<ButtonUserAuthForm
							text="Next"
							// icon={faChevronRight}
							className="bg-blue-400"
							clickHandler={() => setStepNumber(stepNumber + 1)}
						/>
					</div>
				);
			case stepNumber === 2:
				return (
					<div className="flex justify-between items-center mt-4">
						<ButtonUserAuthForm
							text="Cancel"
							className="text-gray-900 bg-gray-200"
							clickHandler={() => setIsSignupOpen(false)}
						/>
						<div className="flex justify-center items-center gap-2">
							<ButtonUserAuthForm
								text="Previous"
								// icon={faChevronLeft}
								className="flex-row-reverse bg-gray-400"
								clickHandler={() => setStepNumber(stepNumber - 1)}
							/>
							<ButtonUserAuthForm
								text="Next"
								// icon={faChevronRight}
								className="bg-blue-400"
								clickHandler={() => setStepNumber(stepNumber + 1)}
							/>
						</div>
					</div>
				);
			case stepNumber === 3:
				return (
					<div className="flex justify-between items-center mt-4">
						<ButtonUserAuthForm
							text="Cancel"
							className="text-gray-900 bg-gray-200"
							clickHandler={() => setIsSignupOpen(false)}
						/>
						<div className="flex justify-center items-center gap-2">
							<ButtonUserAuthForm
								text="Previous"
								// icon={faChevronLeft}
								className="flex flex-row-reverse bg-gray-400"
								clickHandler={() => setStepNumber(stepNumber - 1)}
							/>
							<ButtonUserAuthForm
								text="Submit"
								className="bg-green-400"
								clickHandler={handleSignup}
							/>
						</div>
					</div>
				);
			default:
				return <div></div>;
		}
	};

	return <>{renderButtons()}</>;
};

export default RenderWizardButton;
