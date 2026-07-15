const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Monorepo: stop Next from picking the wrong workspace root (dual lockfiles).
    outputFileTracingRoot: path.join(__dirname, "../../"),
    experimental: {
        optimizePackageImports: ["lucide-react"],
    },
    trailingSlash: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
        ],
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
            },
            {
                source: '/insights/categories/sitecore-cdp-personalize',
                destination: '/insights/categories/experience-optimization/',
                permanent: true
            },
            {
                source: '/insights/categories/sitecore-cdp-personalize/',
                destination: '/insights/categories/experience-optimization/',
                permanent: true
            },
            {
                source: '/insights/categories/generative-ai',
                destination: '/insights/categories/ai/',
                permanent: true
            },
            {
                source: '/insights/categories/generative-ai/',
                destination: '/insights/categories/ai/',
                permanent: true
            }
        ];
    }
};

module.exports = nextConfig;
