/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      unoptimized: true, // Desactivar la optimización para evitar errores con la carga de imágenes
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg|webp|jfif)$/i,
        type: 'asset/resource', // Asegura que las imágenes se sirvan correctamente
      });
      return config;
    },
  };

export default nextConfig;
