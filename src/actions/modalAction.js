import { DISPLAY_LOGIN_MODAL, HIDE_LOGIN_MODAL } from "../constants/modalActionTypes";

export const toggleShowLoginModal = () => {
	const action = { type: DISPLAY_LOGIN_MODAL, payload: true };
	return action;
};

export const toggleHideLoginModal = () => {
	const action = { type: HIDE_LOGIN_MODAL, payload: false };
	return action;
};
