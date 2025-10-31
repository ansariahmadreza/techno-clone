/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // فعال کردن Turbopack (یا حذفش و استفاده از webpack)
  turbopack: {},

  // لاگ ریدایرکت‌ها (مثال)
  async redirects() {
    console.log("Redirects loaded");
    return [];
  },

  // experimental جدید: proxyPrefetch به جای middlewarePrefetch
  experimental: {
    proxyPrefetch: 'strict', // یا 'flexible' بسته به نیاز
  },
};

module.exports = nextConfig;
