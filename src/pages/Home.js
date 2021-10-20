import React from "react";
import DriverHero from "../organisms/DriverHero";
import ModalLogin from "../molecules/ModalLogin.js";
import ModalSignUp from "../organisms/ModalSignUp";
import { toggleHideSignUpModal } from "../actions/modalAction";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
	const modal = useSelector((state) => state.modalReducer);
	const dispatch = useDispatch();

	const renderSignUp = () => {
		return modal.showSignUpModal ? (
			<div
				className="grid place-items-center fixed bg-backdrop top-0 left-0 w-full h-screen z-20"
				onClick={() => dispatch(toggleHideSignUpModal())}
			>
				<ModalSignUp />
			</div>
		) : null;
	};

	const renderLogin = () => {
		return modal.showLoginModal ? <ModalLogin /> : null;
	};

	return (
		<div className="flex flex-col justify-start items-center bg-gray-100 text-gray-900 px-3 w-full h-full min-h-screen">
			{renderLogin()}
			{renderSignUp()}
			<DriverHero />
		</div>
	);
};

export default Home;
