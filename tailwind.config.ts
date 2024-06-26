import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
	darkMode: 'class',
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			boxShadow: {
				'kbColumn': '0px 1px 1px #091e4240, 0px 0px 1px #091e424f',
			},
			flexBasis: {
				'min-content': 'min-content',
			},
		},
		screens: {
			xs: "375px",
			sm: "576px",
			md: "768px",
			lg: "992px",
			xl: "1200px",
			xxl: "1400px",
			"max-xs": { max: "374px" },
			"max-sm": { max: "575px" },
			"max-md": { max: "767px" },
			"max-lg": { max: "991px" },
			"max-xl": { max: "1199px" },
			"max-xxl": { max: "1399px" },
		},
	},
	plugins: [nextui({
		addCommonColors: true
	})],
};
export default config;
