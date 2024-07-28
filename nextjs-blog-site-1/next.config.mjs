/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverActions:{
      bodySizeLimit:'5mb'
    }
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'miro.medium.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
      
      webpack: (config) => {
        config.resolve.fallback = { fs: false };
    
        return config;
      },
};

export default nextConfig;
