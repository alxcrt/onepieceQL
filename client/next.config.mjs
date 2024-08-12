/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: ["https://static.wikia.nocookie.net/**"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
