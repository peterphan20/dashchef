import {
	DISPLAY_LOGIN_MODAL,
	DISPLAY_SIGN_UP_MODAL,
	HIDE_LOGIN_MODAL,
	HIDE_SIGN_UP_MODAL,
} from "../constants";

export const modalReducer = (modal = {}, action) => {
	switch (action.type) {
		case DISPLAY_SIGN_UP_MODAL:
			return { ...modal, showSignUpModal: true };
		case HIDE_SIGN_UP_MODAL:
			return { ...modal, showSignUpModal: false };
		case DISPLAY_LOGIN_MODAL:
			return { ...modal, showLoginModal: true };
		case HIDE_LOGIN_MODAL:
			return { ...modal, showLoginModal: false };
		default:
			return modal;
	}
};
