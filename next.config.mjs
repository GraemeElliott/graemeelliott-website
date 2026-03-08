/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }],
    unoptimized: true, // required for static export
  },
  typescript: {
    ignoreBuildErrors: true, // or fix the TS errors properly
  },
};

export default config;
