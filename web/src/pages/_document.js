import Document, { Html, Head, Main, NextScript } from 'next/document';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head></Head>
                <body className="palette-orange style-simple">
                    <Main />
                    <script src="/js/plugins.js" />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
