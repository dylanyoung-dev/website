import { theme as proTheme } from '@chakra-ui/pro-theme';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { EngageProvider } from '../features/engagetracker/EngageProvider';

export const theme = extendTheme(
    {
        colors: { ...proTheme.colors, brand: proTheme.colors.blue },
        styles: {
            global: {
                h2: {
                    fontSize: 'xs',
                    fontWeight: 'bold'
                },
                h3: {
                    fontSize: 'md',
                    fontWeight: 'bold'
                }
            }
        }
    },

    proTheme
);

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        TagManager.initialize({ gtmId: 'GTM-PK9SFJP' });
    }, []);

    return (
        <EngageProvider>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </EngageProvider>
    );
}
