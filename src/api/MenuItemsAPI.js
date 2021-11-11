import config from "../config";

export const getMenuItem = (id) => {
	const res = await fetch(`${config.API_URL}/kitchen/menu-item/${id}`);
	const data = await res.json();
	return data;
};

export const createMenuItem = (menuItemObject, token) => {
	const res = await fetch(`${config.API_URL}/kitchen/item-create`, {
		method: "POST",
		body: JSON.stringify(menuItemObject),
		headers: {
			"Content-Type": "multipart/form-data",
			auth: token,
		},
	});
	const data = await res.json();
	return data;
};

export const updateMenuItem = (id, menuItemObject, token) => {
	const res = await fetch(`${config.API_URL}/kitchen/item-update/${id}`, {
		method: "PUT",
		body: JSON.stringify(menuItemObject),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			auth: token,
		},
	});
	const data = await res.json();
	return data;
};

export const deleteMenuItem = (id, token) => {
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
