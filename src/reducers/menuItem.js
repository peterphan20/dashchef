import { MENU_ITEMS_LOAD } from "../constants";

export const menuItemsReducer = (menuItems = [], action) => {
	switch (action.type) {
		case MENU_ITEMS_LOAD:
			return action.payload;
		default:
			return menuItems;
	}
};
