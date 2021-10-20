import { combineReducers } from "redux";
import { modalReducer } from "./modal";
import { usersReducer } from "./users";
import { chefsReducer } from "./chefs";

const reducers = combineReducers({ modalReducer, usersReducer, chefsReducer });

export default reducers;
