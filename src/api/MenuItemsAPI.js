import config from "../config";

export const getMenuItem = async (id) => {
	const res = await fetch(`${config.API_URL}/kitchen/menu-item/${id}`);
	const data = await res.json();
	return data;
};

export const createMenuItem = async (formData, token) => {
	const res = await fetch(`${config.API_URL}/kitchen/item-create`, {
		method: "POST",
		body: formData,
		headers: {
			auth: token,
		},
	});
	return res;
};

export const updateMenuItem = async (id, menuItemObject, token) => {
	const res = await fetch(`${config.API_URL}/kitchen/item-update/${id}`, {
		method: "PUT",
		body: JSON.stringify(menuItemObject),
		headers: {
			"Content-Type": "multipart/form-data",
			auth: token,
		},
	});
	const data = await res.json();
	return data;
};

export const deleteMenuItem = async (id, token) => {
	const res = await fetch(`${config.API_URL}/kitchen/item-delete/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			auth: token,
		},
	});
	const data = await res.json();
	return data;
};
