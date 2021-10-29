import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import "./index.css";
import store from "./store";

ReactDOM.render(
	<Provider store={store}>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</Provider>,
	document.getElementById("root")
);
