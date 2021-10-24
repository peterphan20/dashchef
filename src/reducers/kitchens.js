import { KITCHENS_LOAD } from "../constants";

export const kitchensReducer = (kitchens = [], action) => {
	switch (action.type) {
		case KITCHENS_LOAD:
			return action.payload;
		default:
			return kitchens;
	}
};
