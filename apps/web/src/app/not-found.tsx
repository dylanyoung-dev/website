import Link from 'next/link';
import { Home, FileText, BookOpen, Briefcase, Mic, Video, User, ArrowRight, Search } from 'lucide-react';
import { Layout } from '@/components/ui/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const quickLinks = [
    { href: '/', label: 'Home', icon: Home, description: 'Back to homepage' },
    { href: '/insights', label: 'Insights', icon: FileText, description: 'Browse blog posts' },
    { href: '/insights/series', label: 'Series', icon: BookOpen, description: 'View content series' },
    { href: '/apps', label: 'Projects', icon: Briefcase, description: 'See my projects' },
    { href: '/speaking', label: 'Speaking', icon: Mic, description: 'Speaking engagements' },
    { href: '/videos', label: 'Videos', icon: Video, description: 'Video content' },
    { href: '/about', label: 'About', icon: User, description: 'Learn about me' },
  ];

  return (
    <Layout
      metaTitle="404 - Page Not Found"
      metaDescription="The page you are looking for could not be found."
    >
      <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* 404 Number */}
          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-bold text-primary/20 dark:text-primary/30">
              404
            </h1>
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                Let&apos;s get you back on track.
              </p>
            </div>
          </div>

          {/* Primary Action */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/insights">
                <FileText className="h-4 w-4" />
                Browse Insights
              </Link>
            </Button>
          </div>

          {/* Quick Links Grid */}
          <div className="w-full pt-12 border-t">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Search className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Quick Navigation</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Card key={link.href} className="group hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <Link
                          href={link.href}
                          className="flex flex-col items-center p-6 text-center space-y-3 hover:no-underline"
                        >
                          <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-semibold text-sm">{link.label}</h4>
                            <p className="text-xs text-muted-foreground">{link.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="pt-8 text-sm text-muted-foreground">
            <p>
              If you believe this is an error, please{' '}
              <Link href="/contact" className="text-primary hover:underline">
                contact me
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
