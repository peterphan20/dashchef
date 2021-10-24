import config from "../config";

export const getAllKitchen = async (callback) => {
	const res = await fetch(`${config.API_URL}/kitchens`);
	const data = await res.json();
	callback(data.rows);
};

export const getKitchen = async (id) => {
	const res = await fetch(`${config.API_URL}/kitchens/${id}`);
	const data = await res.json();
	return data;
};

export const createKitchen = async (kitchenObject, token) => {
	const res = await fetch(`${config.API_URL}/kitchens/kitchen-create`, {
		method: "POST",
		body: JSON.stringify(kitchenObject),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			auth: token,
		},
	});
	const data = await res.json();
	return data;
};

export const updateKitchen = async (id, kitchenObject, token) => {
	const res = await fetch(`${config.API_URL}/kitchens/kitchen-update/${id}`, {
		method: "PUT",
		body: JSON.stringify(kitchenObject),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			auth: token,
		},
	});
	const data = await res.json();
	return data;
};

export const deleteKitchen = async (id, token) => {
	const res = await fetch(`${config.API_URL}/kitchens/kitchen-delete/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			auth: token,
		},
	});
	const data = await res.json();
	return data;
};
