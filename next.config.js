const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5 : true,
  webpack: (config) => {
    config.resolve.fallback = { fs : false, net : false, tls : false, cardinal : false };
    return config;
  },
  swcMinify: true,
  sassOptions : {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['api.dicebear.com', 'plus.unsplash.com']
  }
  //rewrites : async () => {
  //  return [
  //    {
  //      source: '/api/:path*',
  //      destination: 'http://localhost:5000/:path*'
  //    }
  //  ]
  //}
}

module.exports = nextConfig
