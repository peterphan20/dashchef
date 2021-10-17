import {
	GET_ALL_USERS,
	GET_USER,
	CREATE_USER,
	LOGIN_USER,
	UPDATE_USER,
	DELETE_USER,
} from "../constants/userActionTypes";

import * as api from "../api/usersAPI";

export const getAllUsers = () => async (dispatch) => {
	try {
		const { data } = await api.getAllUsers();
		dispatch({ type: GET_ALL_USERS, payload: data });
	} catch (err) {
		console.log(err.message);
	}
};

export const getUser = (id) => async (dispatch) => {
	try {
		const { data } = await api.getUser(id);
		dispatch({ type: GET_USER, payload: data });
	} catch (err) {
		console.log(err.message);
	}
};

export const createUser = (userObj) => async (dispatch) => {
	try {
		const { data } = await api.createUser(userObj);
		dispatch({ type: CREATE_USER, payload: data });
	} catch (err) {
		console.log(err.message);
	}
};

export const loginUser = (userObj) => async (dispatch) => {
	try {
		const { data } = await api.loginUser(userObj);
		dispatch({ type: LOGIN_USER, payload: data });
	} catch (err) {
		console.log(err.message);
	}
};

export const updateUser = (id, userObj) => async (dispatch) => {
	try {
		const { data } = await api.updateUser(id, userObj);
		dispatch({ type: UPDATE_USER, payload: data });
	} catch (err) {
		console.log(err.message);
	}
};

export const deleteUser = (id) => async (dispatch) => {
	try {
		await api.deleteUser(id);
		dispatch({ type: DELETE_USER, payload: id });
	} catch (err) {
		console.log(err.message);
	}
};
