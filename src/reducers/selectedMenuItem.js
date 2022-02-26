import { SELECTED_MENU_ITEM_LOAD, SELECTED_MENU_ITEM_CREATE, SELECTED_MENU_ITEM_UPDATE, SELECTED_MENU_ITEM_DELETE } from "../constants";

export const selectedMenuItemReducer = (menuItem = {}, action) => {
	switch (action.type) {
		case SELECTED_MENU_ITEM_LOAD:
			return action.payload;
		case SELECTED_MENU_ITEM_CREATE:
			return action.payload;
		case SELECTED_MENU_ITEM_UPDATE:
			return { ...menuItem, ...action.payload };
		case SELECTED_MENU_ITEM_DELETE:
			return {};
		default:
			return menuItem;
	}
};
