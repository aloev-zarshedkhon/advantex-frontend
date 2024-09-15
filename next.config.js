/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      "picsum.photos",
      "localhost",
      "advantex.uz",
      "damirkhon.jprq.live",
    ],
  },
};

module.exports = nextConfig;
