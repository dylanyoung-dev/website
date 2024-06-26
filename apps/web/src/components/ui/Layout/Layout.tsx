import Head from 'next/head';
import React, { FC } from 'react';

import { Box, Container } from '@chakra-ui/react';
import { TrackPageView } from '../../../features/engagetracker/TrackPageView';
import { Footer, Header } from './..';

interface LayoutProps {
    children: React.ReactNode;
    metaTitle: string;
    metaDescription: string;
    ogPhoto?: string;
    ogUrl?: string;
}

export const Layout: FC<LayoutProps> = ({ children, metaTitle, metaDescription, ogPhoto, ogUrl }) => {
    return (
        <>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />

                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="google" content="notranslate" />
                <meta name="title" property="og:title" content={metaTitle} />
                <meta name="description" property="og:description" content={metaDescription} />
                {ogPhoto && <meta name="image" property="og:image" content={ogPhoto} />}
                {ogUrl && <meta property="og:url" content={ogUrl} />}
                <meta property="og:type" content="website" />
                <meta name="author" content="Dylan Young" />
            </Head>

            <TrackPageView slug={ogUrl}>
                <Box as="section" overflowY="auto">
                    <Header />
                    <Container centerContent pt={{ base: '4', lg: '8' }} pb={{ base: '12', lg: '24' }}>
                        {children}
                    </Container>
                    <Footer />
                </Box>
            </TrackPageView>
        </>
    );
};
