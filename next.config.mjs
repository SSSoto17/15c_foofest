/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://innovative-cut-cauliflower.glitch.me",
        port: "",
        pathname: "logos/**",
        search: "",
      },
      //   {
      //     protocol: "https",
      //     hostname: "localhost",
      //     port: "8080",
      //     pathname: "/logos/**",
      //     search: "",
      //   },
    ],
  },
};

export default nextConfig;
