import '../sass/main.scss';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { AppProps } from 'next/app';
import { initClientScript, sendViewEvent } from 'react-sitecore-personalize';
import { useRouter } from 'next/router';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    useEffect(() => {
        TagManager.initialize({ gtmId: 'GTM-PK9SFJP' });
        initClientScript(
            process.env.SITECORE_CDP_CLIENT_KEY,
            process.env.SITECORE_CDP_DOMAIN,
            process.env.SITECORE_CDP_API_ENDPOINT,
            process.env.SITECORE_CDP_CLIENT_VERSION,
            process.env.SITECORE_CDP_POS,
            process.env.SITECORE_CDP_WEBFLOW_TARGET,
            { LogEvents: true, Currency: 'USD', Language: 'EN', Channel: 'Web' }
        );

        sendViewEvent(window.location.href);
    }, []);

    return <Component {...pageProps} />;
}
