const config = {};

if (process.env.NODE_ENV === "development") {
	config.API_URL = "http://localhost:5000";
} else {
	config.API_URL = "https://dashchef.herokuapp.com";
}

export default config;
