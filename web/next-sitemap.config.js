/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://dylanyoung.dev',
    generateRobotsTxt: true,
    outDir: './out',
    sitemapSize: 7000
};
