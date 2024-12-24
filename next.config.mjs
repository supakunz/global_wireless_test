/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Set default routes.
    return [
      {
        source: "/",
        destination: "/register",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
