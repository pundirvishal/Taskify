/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: 'img.clerk.com' },
        // You can add more pattern objects here if necessary
      ],
    },
  };
  
  export default nextConfig;
  