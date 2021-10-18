import {
	DISPLAY_LOGIN_MODAL,
	HIDE_LOGIN_MODAL,
	DISPLAY_SIGN_UP_MODAL,
	HIDE_SIGN_UP_MODAL,
} from "../constants/modalActionTypes";

export const toggleShowLoginModal = () => {
	const action = { type: DISPLAY_LOGIN_MODAL, payload: true };
	return action;
};

export const toggleHideLoginModal = () => {
	const action = { type: HIDE_LOGIN_MODAL, payload: null };
	return action;
};

export const toggleShowSignUpModal = () => {
	const action = { type: DISPLAY_SIGN_UP_MODAL, payload: true };
	return action;
};

export const toggleHideSignUpModal = () => {
	const action = { type: HIDE_SIGN_UP_MODAL, payload: false };
	return action;
};
