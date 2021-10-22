import { USER_LOGIN, USER_UPDATE, USER_LOGOUT } from "../constants";

export const userReducer = (user = {}, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return action.payload;
		case USER_UPDATE:
			// Because we spread action.payload, make sure that action.payload IS an object
			return {...user, ...action.payload}
		case USER_LOGOUT:
			return {};
		default:
			return user;
	}
};

/**
 * For login reducer:
 * user = {
 * 	isChef: Boolean
 * 	firstName: String
 * 	lastName: String
 * 	userID: String
 * 	avatar: String
 * 	loggedIn: Boolean
 * }
 */