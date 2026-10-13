import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // Disables PWA in development mode so it doesn't cache local hot-reloads constantly
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = withPWAConfig({
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
});

export default nextConfig;
