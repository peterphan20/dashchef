module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
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
	variants: {
		extend: {},
	},
	plugins: [],
};
