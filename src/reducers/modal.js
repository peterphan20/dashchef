import { DISPLAY_MODAL } from "../constants/userActionTypes";

export const modalReducer = (modal = { showModal: false }, action) => {
	switch (action.type) {
		case DISPLAY_MODAL:
			return { showModal: !modal.showModal };
		default:
			return modal;
	}
};
