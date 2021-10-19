import React from "react";
import ButtonSignup from "../atoms/ButtonSignup";
import { toggleHideSignUpModal } from "../actions/modalAction";
import { useDispatch } from "react-redux";

const RenderWizardButton = ({ stepNumber, setStepNumber }) => {
	const dispatch = useDispatch();

	const renderButtons = () => {
		switch (stepNumber) {
			case stepNumber === 1:
				return (
					<ButtonSignup
						text="Next"
						buttonIcon="fas fa-chevron-right"
						clickHandler={() => setStepNumber(stepNumber + 1)}
					/>
				);
			case stepNumber === 2:
				return (
					<div>
						<div>
							<ButtonSignup
								text="Next"
								buttonIcon=""
								clickHandler={() => setStepNumber(stepNumber + 1)}
							/>
							<ButtonSignup text="Previous" clickHandler={() => setStepNumber(stepNumber - 1)} />
						</div>
						<ButtonSignup text="Cancel" clickHandler={() => dispatch(toggleHideSignUpModal())} />
					</div>
				);
			case stepNumber === 3:
				return (
					<div>
						<div>
							<ButtonSignup />
							<ButtonSignup />
						</div>
						<ButtonSignup />
					</div>
				);
			default:
				return null;
		}
	};

	return <>{renderButtons()}</>;
};

export default RenderWizardButton;
