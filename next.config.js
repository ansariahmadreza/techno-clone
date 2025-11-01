/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.cache = false; // جلوگیری از ارور Bus error در build
    return config;
  },
};

module.exports = nextConfig;
