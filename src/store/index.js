import reducers from "../reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// create our store from our notesReducer and use loadFromLocalStorage
// to overwrite any values that we already have saved

const store = createStore(
	reducers,
	compose(applyMiddleware(thunk)),
	{},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
