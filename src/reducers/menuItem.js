import { MENU_ITEMS_LOAD, MENU_ITEMS_DELETE } from "../constants";

export const menuItemsReducer = (menuItems = [], action) => {
	switch (action.type) {
		case MENU_ITEMS_LOAD:
			return action.payload;
		case MENU_ITEMS_DELETE:
			return [];
		default:
			return menuItems;
	}
};
