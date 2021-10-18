import { useState } from "react";
import { useSelector } from "react-redux";
import WizardModalPrimary from "../molecules/WizardModalPrimary";
import WizardModalSecondary from "../molecules/WizardModalSecondary";
import WizardModalTertiary from "../molecules/WizardModalTertiary";

const Signup = () => {
	const [wizardPrimaryModal, setWizardPrimaryModal] = useState(false);
	const [wizardSecondaryModal, setWizardSecondaryModal] = useState(false);
	const [wizardTertiaryModal, setWizardTertiaryModal] = useState(false);

	const modal = useSelector((state) => state.modalReducer);

	const renderWizardModal = wizardPrimaryModal ? (
		<WizardModalPrimary
			value={wizardPrimaryModal}
			setWizardPrimaryModal={setWizardPrimaryModal}
			setWizardSecondaryModal={setWizardSecondaryModal}
		/>
	) : wizardSecondaryModal ? (
		<WizardModalSecondary
			value={wizardSecondaryModal}
			setWizardSecondaryModal={setWizardSecondaryModal}
		/>
	) : wizardTertiaryModal ? (
		<WizardModalTertiary
			value={wizardTertiaryModal}
			setWizardTertiaryModal={setWizardTertiaryModal}
		/>
	) : null;

	return <div>{modal.showSignupModal ? renderWizardModal : null}</div>;
};

export default Signup;
