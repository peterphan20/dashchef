import { DISPLAY_LOGIN_MODAL, HIDE_LOGIN_MODAL } from "../constants/modalActionTypes";

export const modalReducer = (modal = {}, action) => {
	switch (action.type) {
		case DISPLAY_LOGIN_MODAL:
		case HIDE_LOGIN_MODAL:
			return { ...modal, showLoginModal: action.payload };
		default:
			return modal;
	}
};
