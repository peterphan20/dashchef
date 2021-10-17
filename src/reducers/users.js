import {
	GET_ALL_USERS,
	GET_USER,
	CREATE_USER,
	LOGIN_USER,
	UPDATE_USER,
	DELETE_USER,
} from "../constants/userActionTypes";

export const usersReducer = (users = [], action) => {
	switch (action.type) {
		case GET_ALL_USERS:
		case GET_USER:
			return action.payload;
		case CREATE_USER:
		case LOGIN_USER:
			return [...users, action.payload];
		case UPDATE_USER:
			return users.map((user) => (user.id === action.payload.id ? action.payload : user));
		case DELETE_USER:
			return users.filter((user) => user.id !== action.payload);
		default:
			return users;
	}
};
