export interface IEngageConfiguration {
    SitecoreCdpClientKey: string;
    SitecoreCdpPointOfSale: string;
    SitecoreCdpCookieDomain?: string;
    SitecoreCdpTargetUrl: string;
}

export const EngageConfiguration: IEngageConfiguration = {
    SitecoreCdpClientKey: process.env.NEXT_PUBLIC_SITECORE_CDP_CLIENT_KEY ?? '',
    SitecoreCdpPointOfSale: process.env.NEXT_PUBLIC_SITECORE_CDP_POINT_OF_SALE ?? '',
    SitecoreCdpCookieDomain: process.env.NEXT_PUBLIC_SITECORE_CDP_COOKIE_DOMAIN ?? '',
    SitecoreCdpTargetUrl: process.env.NEXT_PUBLIC_SITECORE_CDP_TARGET_URL ?? ''
};
