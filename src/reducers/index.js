import { combineReducers } from "redux";
import { modalReducer } from "./modal";
import { userReducer } from "./user";
import { chefsReducer } from "./chefs";

const reducers = combineReducers({ modalReducer, userReducer, chefsReducer });

export default reducers;
