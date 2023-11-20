/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/index",
        destination: "/Home",
        permanent: true,
      },
    ];
  },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
