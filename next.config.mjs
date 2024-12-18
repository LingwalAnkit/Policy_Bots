/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.(".svg")
      );
  
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, 
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
          use: ["@svgr/webpack"],
        }
      );
      fileLoaderRule.exclude = /\.svg$/i;
  
      return config;
    },
    images: {
      domains: ['assets.aceternity.com'],
      domains: ['via.placeholder.com'],
    },eslint: {
      // Ignore 'venv' folder for ESLint
      ignoreDuringBuilds: true,
    },
  };
  
  export default nextConfig;
  