const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
    loader: "imgix",
    path: "https://avatars.githubusercontent.com/",
  },
});

module.exports = nextConfig;
