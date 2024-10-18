/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      unoptimized: true, // Desactivar la optimización para evitar errores con la carga de imágenes
    },
  };

export default nextConfig;
