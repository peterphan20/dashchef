module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundColor: (theme) => ({
				backdrop: "rgba(0, 0, 0, 0.3)",
				modal_shadow: "rgba(0, 0, 0, 0.2)",
			}),
			fontFamily: {
				headers: ["Montserrat", "sans-serif"],
				accents: ["Cormorant", "sans-serif"],
				body: ["Maitree", "sans-serif"],
			},
		},
	},
	plugins: [],
};
