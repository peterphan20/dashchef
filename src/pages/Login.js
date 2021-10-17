import React from "react";
import ModalLogin from "../molecules/ModalLogin";
import { useSelector } from "react-redux";

const Login = () => {
	const modal = useSelector((state) => state.modalReducer);

	return <form>{modal.showLoginModal ? <ModalLogin /> : null}</form>;
};

export default Login;
