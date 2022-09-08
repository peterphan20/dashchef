import { CART_ADD, CART_REMOVE, CART_UPDATE } from "../constants";

export const cartReducer = (cart = [], action) => {
	switch (action.type) {
		case CART_ADD:
			return [...cart.filter((item) => item.id !== action.payload.id), action.payload];
		case CART_REMOVE:
			return cart.filter((item) => item.id !== action.payload.id);
		case CART_UPDATE:
			return cart.map((item) => {
				if (item.id !== action.payload.id) {
					return item;
				} else {
					return action.payload;
				}
			});
		default:
			return cart;
	}
};
