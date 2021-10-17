import React from "react";
import ModalLogin from "../molecules/ModalLogin";
import { useSelector } from "react-redux";

const Login = () => {
	const modal = useSelector((state) => state.modalReducer);

	return <div>{modal.showLoginModal ? <ModalLogin /> : null}</div>;
};

export default Login;
