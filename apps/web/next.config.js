module.exports = {
    trailingSlash: true,
    webpack: (config, { webpack }) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });

        return config;
    }
};
