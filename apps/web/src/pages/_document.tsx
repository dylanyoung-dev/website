import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/favicon.ico"></link>
                </Head>
                <body className="palette-orange style-simple">
                    <Main />
                    <script src="/js/plugins.js" />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
