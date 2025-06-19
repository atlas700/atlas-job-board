import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    dynamicIO: true,
  },
};

export default config;
