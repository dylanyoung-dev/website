/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ['cdn.sanity.io', 'avatars.githubusercontent.com'],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });

        return config;
    },
    async redirects() {
        return [
            {
                source: '/sugcon-eu-2024/:slug*',
                destination: '/speaking/sugcon-europe-2024',
                permanent: true
            }
        ];
    }
};

module.exports = nextConfig;
