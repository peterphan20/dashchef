import { combineReducers } from "redux";
import { modalReducer } from "./modal";
import { usersReducer } from "./users";

const reducers = combineReducers({ modalReducer, usersReducer });

export default reducers;
