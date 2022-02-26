import { combineReducers } from "redux";
import { userReducer } from "./user";
import { kitchensReducer } from "./kitchens";
import { selectedKitchenReducer } from "./selectedKitchen";
import { menuItemsReducer } from "./menuItem";
import { selectedMenuItemReducer } from "./selectedMenuItem";
import { cartReducer } from "./cart";
import { modalReducer } from "./modal";

const reducers = combineReducers({
	userReducer,
	modalReducer,
	kitchensReducer,
	selectedKitchenReducer,
	menuItemsReducer,
	selectedMenuItemReducer,
	cartReducer,
});

export default reducers;
