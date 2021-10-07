module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
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
