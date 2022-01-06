import config from "../config";

export const getAllChefs = async () => {
	const res = await fetch(`${config.API_URL}/chefs`);
	const data = await res.json();
	return data;
};

export const getChef = async (id) => {
	const res = await fetch(`${config.API_URL}/chef/${id}`);
	const data = await res.json();
	return data;
};

export const createChef = async (chefObj) => {
	const res = await fetch(`${config.API_URL}/auth/chef`, {
		method: "POST",
		body: JSON.stringify(chefObj),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	});
	const data = await res.json();
	return data;
};

export const loginChef = async (chefObj) => {
	const res = await fetch(`${config.API_URL}/auth/chef/login`, {
		method: "POST",
		body: JSON.stringify(chefObj),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	});
	const data = await res.json();
	return data;
};

export const updateChef = async (id, chefObj, token) => {
	const res = await fetch(`${config.API_URL}/chefs/chef-update/${id}`, {
		method: "PUT",
		body: JSON.stringify(chefObj),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			auth: token,
		},
	});
	const data = await res.json();
	return data;
};

export const deleteChef = async (id, token) => {
	const res = await fetch(`${config.API_URL}/chefs/chef-delete/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			auth: token,
		},
	});
	const data = await res.json();
	return data;
};
