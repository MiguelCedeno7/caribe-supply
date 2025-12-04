/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false,
  experimental: {
    optimizeCss: false, // Evita des-sincronización de estilos en SSR
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};


export default nextConfig;


