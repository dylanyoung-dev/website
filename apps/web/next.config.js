module.exports = {
    trailingSlash: true,
    webpack: (config, { webpack }) => {
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
