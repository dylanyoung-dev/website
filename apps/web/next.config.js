/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    output: 'export',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    images: {
        unoptimized: true,
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
