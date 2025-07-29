// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', // Example: setting the limit to 2MB
    },
  },
};

// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url);
// const withNextIntl = require("next-intl/plugin")();

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
// };

// export default withNextIntl(nextConfig);