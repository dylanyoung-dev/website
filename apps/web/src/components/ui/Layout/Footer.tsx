import Link from "next/link";
import { FaDev, FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const Footer = () => (
  <footer className="bg-background border-t">
    <div className="container mx-auto px-4">
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-12 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full lg:w-auto">
          <div className="space-y-4 min-w-[160px]">
            <p className="text-sm font-semibold text-muted-foreground">General</p>
            <div className="space-y-3 flex flex-col">
              <Button variant="link" asChild className="p-0 h-auto justify-start w-full">
                <Link href="/">Home</Link>
              </Button>
              <Button variant="link" asChild className="p-0 h-auto justify-start w-full">
                <Link href="/insights">Insights</Link>
              </Button>
              <Button variant="link" asChild className="p-0 h-auto justify-start w-full">
                <Link href="/insights/series">Series</Link>
              </Button>
              <Button variant="link" asChild className="p-0 h-auto justify-start w-full">
                <Link href="/videos">Videos</Link>
              </Button>
              <Button variant="link" asChild className="p-0 h-auto justify-start hidden w-full">
                <Link href="/about">About</Link>
              </Button>
              <Button variant="link" asChild className="p-0 h-auto justify-start hidden w-full">
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4 min-w-[160px]">
            <p className="text-sm font-semibold text-muted-foreground">Insights</p>
            <div className="space-y-3 flex flex-col">
              <Button variant="link" asChild className="p-0 h-auto justify-start w-full">
                <Link href="/insights/categories/sitecore-cdp-personalize/">CDP/Personalize</Link>
              </Button>
              <Button variant="link" asChild className="p-0 h-auto justify-start w-full">
                <Link href="/insights/categories/backend-development/">Backend Development</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12">
          <div className="flex justify-between sm:justify-start w-full sm:w-auto gap-8">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/dylanyoung/" aria-label="LinkedIn">
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/dylanyoung-dev" aria-label="GitHub">
                  <FaGithub className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com/dylanyoung_dev" aria-label="Twitter">
                  <FaTwitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://youtube.com/c/dylanyoungdev" aria-label="YouTube">
                  <FaYoutube className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://dev.to/dylanyoung_dev" aria-label="Dev.to">
                  <FaDev className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);
