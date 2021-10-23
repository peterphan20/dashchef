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

export const createUser = async (userObject) => {
	const res = await fetch(`${config.API_URL}/auth/user`, {
		method: "POST",
		body: JSON.stringify(userObject),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	});
	const data = await res.json();
	return data;
};

export const loginUser = async (userObject) => {
	const res = await fetch(`${config.API_URL}/auth/user/login`, {
		method: "POST",
		body: JSON.stringify(userObject),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	});
	const data = await res.json();
	return data;
};

export const updateUser = async (id, userObject, token) => {
	const res = await fetch(`${config.API_URL}/users/user-update/${id}`, {
		method: "PUT",
		body: JSON.stringify(userObject),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			auth: token,
		},
	});
	const data = await res.json();
	return data;
};

export const deleteUser = async (id, token) => {
	const res = await fetch(`${config.API_URL}/users/user-delete/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			auth: token,
		},
	});
	const data = await res.json();
	return data;
};
