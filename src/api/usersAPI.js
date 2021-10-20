import config from "../config";

export const getAllUsers = async () => {
	const res = await fetch(`${config.API_URL}/users`);
	const data = await res.json();
	return data;
};

export const getUser = async (id) => {
	const res = await fetch(`${config.API_URL}/user/${id}`);
	const data = await res.json();
	return data;
};

export const createUser = async (userObj) => {
	const res = await fetch(`${config.API_URL}/auth/user`, {
		method: "POST",
		body: JSON.stringify(userObj),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	});
	const data = await res.json();
	return data;
};

export const loginUser = async (userObj) => {
	const res = await fetch(`${config.API_URL}/auth/user/login`, {
		method: "POST",
		body: JSON.stringify(userObj),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	});
	const data = await res.json();
	return data;
};

export const updateUser = async (id, userObj) => {
	const res = await fetch(`${config.API_URL}/users/user-update/${id}`, {
		method: "PUT",
		body: JSON.stringify(userObj),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	});
	const data = await res.json();
	return data;
};

export const deleteUser = async (id) => {
	const res = await fetch(`${config.API_URL}/users/user-delete/${id}`, {
		method: "DELETE",
	});
	const data = await res.json();
	return data;
};
