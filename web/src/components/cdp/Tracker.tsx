import { createContext, useEffect, useState } from 'react';
import { Engage, init } from '@sitecore/engage';

export interface ITrackerInterface {
    engage: Engage;
}

export const TrackerContext = createContext<ITrackerInterface | null>(null);

export const TrackerProvider = ({ children }) => {
    const [engage, setEngage] = useState<Engage | null>(null);

    const loadEngage = async () => {
        let engageInit = await init({
            clientKey: process.env.SITECORE_CDP_CLIENT_KEY, // for example, "ZpHxO9WvLOfQRVPlvo0BqB8YjGYuFfNe"
            targetURL: 'https://api-engage-us.sitecorecloud.io', // for example, "https://api-engage-eu.sitecorecloud.io"
            cookieDomain: 'dylanyoung.dev', // for example, ".beta.myretailsite.com"
            cookieExpiryDays: 365,
            forceServerCookieMode: false
        });

        setEngage(engageInit);
    };

    useEffect(() => {
        loadEngage();
    }, []);

    return <TrackerContext.Provider value={{ engage }}>{children}</TrackerContext.Provider>;
};
