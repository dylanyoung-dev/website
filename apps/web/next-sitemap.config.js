/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://dylanyoung.dev',
    generateRobotsTxt: true,
    outDir: './public',
    sitemapSize: 7000
};

module.exports = config;
