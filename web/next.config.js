module.exports = {
    trailingSlash: true,
    devIndicators: {
        autoPrerender: false
    },
    env: {
        SITECORE_CDP_CLIENT_KEY: process.env.SITECORE_CDP_CLIENT_KEY,
        SITECORE_CDP_DOMAIN: process.env.SITECORE_CDP_DOMAIN,
        SITECORE_CDP_API_ENDPOINT: process.env.SITECORE_CDP_API_ENDPOINT,
        SITECORE_CDP_CLIENT_VERSION: process.env.SITECORE_CDP_CLIENT_VERSION,
        SITECORE_CDP_POS: process.env.SITECORE_CDP_POS,
        SITECORE_CDP_WEBFLOW_TARGET: process.env.SITECORE_CDP_WEBFLOW_TARGET
    },
    webpack: (config, { webpack }) => {
        return config;
    }
};
