import { MENU_ITEM_LOAD, MENU_ITEM_CREATE, MENU_ITEM_UPDATE, MENU_ITEM_DELETE } from "../constants";

export const selectedMenuItemReducer = (menuItem = {}, action) => {
	switch (action.type) {
		case MENU_ITEM_LOAD:
			return action.payload;
		case MENU_ITEM_CREATE:
			return action.payload;
		case MENU_ITEM_UPDATE:
			return { ...menuItem, ...action.payload };
		case MENU_ITEM_DELETE:
			return {};
		default:
			return menuItem;
	}
};
