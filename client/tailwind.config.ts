import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      backgroundImage: {
        bg: "url('/bg.webp')",
        wanted: "url('/wanted-sm.png')",
      },
      backgroundSize: {
        landing: "120rem",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        alwaysInMyHeart: ["var(--font-always-in-my-heart)"],
      },
      objectPosition: {
        "center-top": "center top",
      },
    },
  },
  plugins: [],
};
export default config;
