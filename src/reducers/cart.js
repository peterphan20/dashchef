import { CART_ADD, CART_REMOVE, CART_UPDATE } from "../constants";

export const cartReducer = (cart = [], action) => {
	switch (action.type) {
		case CART_ADD:
			return [...cart, action.payload];
		case CART_REMOVE:
			return cart.filter((item) => item.id !== action.payload.id);
		case CART_UPDATE:
			/**
			 * Return a new array where if the item ID matches the payload item ID
			 * then use the updated version of the item in the array instead
			 */
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
