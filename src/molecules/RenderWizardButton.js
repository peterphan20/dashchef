import React from "react";
import ButtonSignup from "../atoms/ButtonSignup";
import { useDispatch } from "react-redux";
import { HIDE_SIGN_UP_MODAL } from "../constants";

const RenderWizardButton = ({ stepNumber, setStepNumber, handleSignup }) => {
	const dispatch = useDispatch();

	const renderButtons = () => {
		switch (true) {
			case stepNumber === 1:
				return (
					<div className="flex self-end mt-4">
						<ButtonSignup
							text="Next"
							buttonIcon="fas fa-chevron-right"
							className="bg-blue-400"
							clickHandler={setStepNumber(stepNumber + 1)}
						/>
					</div>
				);
			case stepNumber === 2:
				return (
					<div className="flex justify-between items-center mt-4">
						<ButtonSignup
							text="Cancel"
							className="text-gray-900 bg-gray-200"
							clickHandler={dispatch({ type: HIDE_SIGN_UP_MODAL })}
						/>
						<div className="flex justify-center items-center gap-2">
							<ButtonSignup
								text="Previous"
								buttonIcon="fas fa-chevron-left"
								className="flex-row-reverse bg-gray-400"
								clickHandler={setStepNumber(stepNumber - 1)}
							/>
							<ButtonSignup
								text="Next"
								buttonIcon="fas fa-chevron-right"
								className="bg-blue-400"
								clickHandler={setStepNumber(stepNumber + 1)}
							/>
						</div>
					</div>
				);
			case stepNumber === 3:
				return (
					<div className="flex justify-between items-center mt-4">
						<ButtonSignup
							text="Cancel"
							className="text-gray-900 bg-gray-200"
							clickHandler={dispatch({ type: HIDE_SIGN_UP_MODAL })}
						/>
						<div className="flex justify-center items-center gap-2">
							<ButtonSignup
								text="Previous"
								className="flex flex-row-reverse bg-gray-400"
								clickHandler={setStepNumber(stepNumber - 1)}
							/>
							<ButtonSignup text="Submit" className="bg-green-400" clickHandler={handleSignup} />
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
