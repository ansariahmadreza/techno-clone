/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // هر تغییر دلخواه تو config
    return config; // ⚠ حتما config باید return بشه
  },
};

module.exports = nextConfig;
