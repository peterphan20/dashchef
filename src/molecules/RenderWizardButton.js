import React from "react";
import ButtonSignup from "../atoms/ButtonSignup";
import { toggleHideLoginModal, toggleHideSignUpModal } from "../actions/modalAction";
import { useDispatch } from "react-redux";

const RenderWizardButton = ({ stepNumber, setStepNumber }) => {
	const dispatch = useDispatch();

	const renderButtons = () => {
		switch (true) {
			case stepNumber === 1:
				return (
					<ButtonSignup
						text="Next"
						buttonIcon="fas fa-chevron-right"
						className="bg-blue-400 mt-5"
						clickHandler={() => setStepNumber(stepNumber + 1)}
					/>
				);
			case stepNumber === 2:
				return (
					<div className="flex justify-between items-center mt-1 pt-5 border-t border-gray-200">
						<ButtonSignup
							text="Cancel"
							className="text-gray-900 bg-gray-200"
							clickHandler={() => dispatch(toggleHideSignUpModal())}
						/>
						<div className="flex justify-center items-center gap-2">
							<ButtonSignup
								text="Previous"
								buttonIcon="fas fa-chevron-left"
								className="flex-row-reverse bg-gray-400"
								clickHandler={() => setStepNumber(stepNumber - 1)}
							/>
							<ButtonSignup
								text="Next"
								buttonIcon="fas fa-chevron-right"
								className="bg-blue-400"
								clickHandler={() => setStepNumber(stepNumber + 1)}
							/>
						</div>
					</div>
				);
			case stepNumber === 3:
				return (
					<div>
						<div>
							<ButtonSignup text="Submit" />
							<ButtonSignup text="Previous" clickHandler={() => setStepNumber(stepNumber - 1)} />
						</div>
						<ButtonSignup text="Cancel" clickHandler={() => dispatch(toggleHideLoginModal())} />
					</div>
				);
			default:
				return <div>It's fucked</div>;
		}
	};

	return <>{renderButtons()}</>;
};

export default RenderWizardButton;
