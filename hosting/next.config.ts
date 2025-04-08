/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Optimization for Three.js and GSAP libraries
    config.module.rules.push({
      test: /three\/examples\/js/,
      use: 'babel-loader',
    });

    // Enable source maps for debugging webpack's output
    config.devtool = 'source-map';

    return config;
  },
  transpilePackages: ['three', 'gsap', 'simplex-noise'],
};

module.exports = nextConfig;