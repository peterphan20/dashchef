import {
	SELECTED_KITCHEN_CREATE,
	SELECTED_KITCHEN_UPDATE,
	SELECTED_KITCHEN_DELETE,
	SELECTED_KITCHEN_LOAD,
} from "../constants";

export const selectedKitchenReducer = (kitchen = {}, action) => {
	switch (action.type) {
		case SELECTED_KITCHEN_LOAD:
			return action.payload;
		case SELECTED_KITCHEN_CREATE:
			return action.payload;
		case SELECTED_KITCHEN_UPDATE:
			return { ...kitchen, ...action.payload };
		case SELECTED_KITCHEN_DELETE:
			return {};
		default:
			return kitchen;
	}
};
