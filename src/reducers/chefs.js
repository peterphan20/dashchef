import {
	GET_ALL_CHEFS,
	GET_CHEF,
	CREATE_CHEF,
	LOGIN_CHEF,
	UPDATE_CHEF,
	DELETE_CHEF,
} from "../constants/chefActionTypes";

export const chefsReducer = (chefs = [], action) => {
	switch (action.type) {
		case GET_ALL_CHEFS:
		case GET_CHEF:
			return action.payload;
		case CREATE_CHEF:
		case LOGIN_CHEF:
			return { ...chefs, data: action.payload };
		case UPDATE_CHEF:
			return chefs.map((chef) => (chef.id === action.payload.id ? action.payload : chef));
		case DELETE_CHEF:
			return chefs.filter((chef) => chef.id !== action.payload);
		default:
			return chefs;
	}
};
