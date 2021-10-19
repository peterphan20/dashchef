import React from "react";
import DriverHero from "../organisms/DriverHero";
import ModalLogin from "../molecules/ModalLogin.js";
import ModalSignUp from "../organisms/ModalSignUp";
import { useSelector } from "react-redux";

const Home = () => {
	const modal = useSelector((state) => state.modalReducer);

	const renderSignUp = () => {
		return modal.showSignUpModal ? <ModalSignUp /> : null;
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
