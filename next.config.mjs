/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.dicebear.com'],
        // Alternatively, for more specific control you can use:
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
