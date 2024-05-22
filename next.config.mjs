/** @type {import('next').NextConfig} */

// const nextConfig = {images: {
//     domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
//     unoptimized: true,
// }};

const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "*.googleusercontent.com",
          port: "",
          pathname: "**",
        },
      ],
    },
  };

export default nextConfig;
