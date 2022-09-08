import config from "../config";

export const getAllKitchen = async () => {
	const res = await fetch(`${config.API_URL}/kitchens`);
	const data = await res.json();
	return data;
};

export const getKitchen = async (id) => {
	const res = await fetch(`${config.API_URL}/kitchen/${id}`);
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

export const updateKitchenAvatar = async (id, formData, token) => {
	const res = await fetch(`${config.API_URL}/kitchen/avatar-update/${id}`, {
		method: "PUT",
		body: formData,
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			auth: token,
		},
	});
	const data = await res.json();
	return data;
};

export const updateKitchenBanner = async (id, formData, token) => {
	const res = await fetch(`${config.API_URL}/kitchen/banner-update/${id}`, {
		method: "PUT",
		body: formData,
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
