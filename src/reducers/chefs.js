import { LOAD_CHEFS, CHEF_CREATE, CHEF_UPDATE, CHEF_DELETE } from "../constants";

export const chefsReducer = (chefs = [], action) => {
	switch (action.type) {
		// Query ALL the chefs and place them in the store
		case LOAD_CHEFS:
			// action.payload is the array of all chefs
			return action.payload;
		case CHEF_CREATE:
			// action.payload is the new chef
			return [...chefs, action.payload];
		case CHEF_UPDATE:
			return chefs.map((chef) => (chef.id === action.payload.id ? action.payload : chef));
		case CHEF_DELETE:
			return chefs.filter((chef) => chef.id !== action.payload.id);
		default:
			return chefs;
	}
};
