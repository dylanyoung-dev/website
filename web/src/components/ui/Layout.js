import React from 'react';
import Head from 'next/head';

import Header from '../ui/Header';
import Footer from '../ui/Footer';
import { useRouter } from 'next/router';

const Layout = ({ children, metaTitle, metaDescription, ogPhoto, ogUrl }) => {
    return (
        <>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />

                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="google" content="notranslate" />
                <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&display=swap" rel="stylesheet" />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                {ogPhoto && <meta property="og:image" content={ogPhoto} />}
                {ogUrl && <meta property="og:url" content={ogUrl} />}
                <meta property="og:type" content="website" />
            </Head>

            <div id="page" className="site">
                <Header />
                <div id="content" className="site-content">
                    <div className="inner">
                        <main id="main" className="site-main">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
