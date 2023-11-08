/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			primary: '#2196F3',
			error: '#D32F2F',
			success: '#2E7D32',
			warning: '#ED6C02',
			grey: '#D9D9D9',
			white: '#FFFFFF',
		},
		screens: {
			xs: '400px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
	},
	plugins: [],
};
