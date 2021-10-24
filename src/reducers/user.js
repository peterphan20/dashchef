import { USER_LOGIN, USER_UPDATE, USER_LOGOUT } from "../constants";

export const userReducer = (user = {}, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return action.payload;
		case USER_UPDATE:
			return { ...user, ...action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return user;
	}
};
