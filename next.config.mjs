await import("./src/env.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.ibb.co",
            }
        ]
    }
};

export default nextConfig;