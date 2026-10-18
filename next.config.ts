import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/#সব-পণ্য",
        permanent: false,
      },
      {
        source: "/products/:slug",
        destination: "/product/:slug",
        permanent: false,
      },
      {
        source: "/categories",
        destination: "/",
        permanent: false,
      },
      {
        source: "/categories/:slug",
        destination: "/category/:slug",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
