/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() { // Set default routes.
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
