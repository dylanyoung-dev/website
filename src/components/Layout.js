import React from 'react';
import Head from 'next/head';

import { classNames } from '../utils/classNames';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, metaTitle, metaDescription }) => {

    return (
        <>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />

                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="google" content="notranslate" />
                <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&display=swap" rel="stylesheet" />
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
    )
}

export default Layout;