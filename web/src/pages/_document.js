import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body className="palette-green style-simple">
                    <Main />
                    <script src="/js/plugins.js" />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
