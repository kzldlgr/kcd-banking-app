/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "teal",

					secondary: "#7B92B2",

					accent: "#67CBA0",

					neutral: "#181A2A",

					"base-100": "#f0fef2",

					info: "#3ABFF8",

					success: "#36D399",

					warning: "#FBBD23",

					error: "#F87272",
				},
			},
		],
	},
	theme: {
		extend: {
			colors: {},
			fontFamily: { pop: ["Poppins"] },
		},
	},
	important: true,
	plugins: [require("daisyui")],
};
