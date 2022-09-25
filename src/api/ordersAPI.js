import config from "../config";

export const createOrder = async (token, orderObject) => {
	const res = await fetch(`${config.API_URL}/orders/order-create`, {
		method: "POST",
		body: JSON.stringify(orderObject),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			auth: token,
		},
	});
	const data = await res.json();
	return data;
};
