import { USER_LOGIN, USER_UPDATE, USER_LOGOUT } from "../constants";

export const userReducer = (users = [], action) => {
	switch (action.type) {
		case USER_LOGIN:
			return [...users, action.payload];
		case USER_UPDATE:
			return users.map((user) => (user.id === action.payload.id ? action.payload : user));
		case USER_LOGOUT:
			return users.filter((user) => user.id !== action.payload.id);
		default:
			return users;
	}
};

// For login reducer:
/**
 * isChef?
 * username
 * firstname
 * lastname
 * userid
 * avatar
 * loggedIn?
 *
 */
