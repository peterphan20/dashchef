import { useState } from "react";
import { useSelector } from "react-redux";
import WizardModalPrimary from "../molecules/WizardModalPrimary";
import WizardModalSecondary from "../molecules/WizardModalSecondary";
import WizardModalTertiary from "../molecules/WizardModalTertiary";

const Signup = () => {
	const [wizardPrimaryModal, setWizardPrimaryModal] = useState(null);
	const [wizardSecondaryModal, setWizardSecondaryModal] = useState(false);
	const [wizardTertiaryModal, setWizardTertiaryModal] = useState(false);
	const modal = useSelector((state) => state.modalReducer);

	const renderWizardModal = modal.showSignupModal ? (
		<WizardModalPrimary setWizardSecondaryModal={setWizardSecondaryModal} />
	) : wizardSecondaryModal ? (
		<WizardModalSecondary
			value={wizardSecondaryModal}
			setWizardTertiaryModal={setWizardTertiaryModal}
		/>
	) : wizardTertiaryModal ? (
		<WizardModalTertiary
			value={wizardTertiaryModal}
			setWizardTertiaryModal={setWizardTertiaryModal}
		/>
	) : null;

	return <div>{renderWizardModal}</div>;
};

export default Signup;
