const config = {};

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
	config.API_URL = "http://localhost:5000";
} else {
	config.API_URL = "ec2-3-86-87-201.compute-1.amazonaws.com";
}

export default config;
