import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { StructuredData } from '@/components/seo/StructuredData';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const baseUrl = process.env.HOST_URL || 'https://dylanyoung.dev';
const siteName = 'Dylan Young';

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: 'Dylan Young: Sitecore Developer - AI/ML, .Net, Python, React, Typescript',
        template: '%s | Dylan Young',
    },
    description: 'The thoughts and learnings of Dylan Young, Tech Enthusiast and Tech Influencer. Blog posts about Sitecore, AI/ML, .Net, Python, React, and TypeScript.',
    keywords: ['Sitecore', 'AI', 'Machine Learning', '.NET', 'Python', 'React', 'TypeScript', 'Web Development', 'Sitecore MVP'],
    authors: [{ name: 'Dylan Young', url: baseUrl }],
    creator: 'Dylan Young',
    publisher: 'Dylan Young',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: baseUrl,
        siteName: siteName,
        title: 'Dylan Young: Sitecore Developer - AI/ML, .Net, Python, React, Typescript',
        description: 'The thoughts and learnings of Dylan Young, Tech Enthusiast and Tech Influencer',
        images: [
            {
                url: `${baseUrl}/images/dylan.jpg`,
                width: 1200,
                height: 630,
                alt: 'Dylan Young',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dylan Young: Sitecore Developer',
        description: 'The thoughts and learnings of Dylan Young, Tech Enthusiast and Tech Influencer',
        images: [`${baseUrl}/images/dylan.jpg`],
        creator: '@dylanyoung',
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    alternates: {
        canonical: baseUrl,
    },
    // Geographic metadata
    other: {
        'geo.region': 'US',
        'geo.placename': 'United States',
    },
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} palette-orange style-simple`}>
                <StructuredData type="Person" />
                <StructuredData type="Organization" />
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
                <Script src="/js/plugins.js" />
                <Script
                    id="gtm-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PK9SFJP');
            `
                    }}
                />
            </body>
        </html>
    );
}
