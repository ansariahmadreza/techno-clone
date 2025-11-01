/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.cache = false; // جلوگیری از ارور Bus error در build
  },
};

module.exports = nextConfig;
