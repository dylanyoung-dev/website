"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { FiEdit, FiHome, FiLayers, FiList, FiMenu, FiSun, FiUser, FiVideo } from "react-icons/fi";
import { MdClose, MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <section>
      <nav className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 lg:py-5">
          <div className="flex items-center justify-between gap-10">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://avatars.githubusercontent.com/u/5227854?v=4" alt="Dylan Young" />
              <AvatarFallback>DY</AvatarFallback>
            </Avatar>
            <div className="hidden lg:flex flex-1 justify-between items-center">
              <div className="flex gap-4">
                <Button variant="ghost" asChild>
                  <Link href="/">Home</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/insights">Insights</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/insights/series">Series</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/apps">My Projects</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/speaking">Speaking</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/videos">Videos</Link>
                </Button>
                <Button variant="ghost" asChild className="hidden">
                  <Link href="/snippets">Snippets</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle theme"
                  onClick={toggleTheme}
                >
                  {theme === "light" ? <MdDarkMode className="h-5 w-5" /> : <FiSun className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            <div className="flex lg:hidden items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                {theme === "light" ? <MdDarkMode className="h-5 w-5" /> : <FiSun className="h-5 w-5" />}
              </Button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open Menu" ref={menuButtonRef}>
                    <FiMenu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-sm">
                  <SheetHeader>
                    <div className="flex items-center justify-between">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/5227854?v=4" alt="Dylan Young" />
                        <AvatarFallback>DY</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Toggle theme"
                          onClick={toggleTheme}
                        >
                          {theme === "light" ? <MdDarkMode className="h-5 w-5" /> : <FiSun className="h-5 w-5" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Close Menu"
                          onClick={() => setIsOpen(false)}
                        >
                          <MdClose className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </SheetHeader>
                  <div className="mt-8 space-y-3">
                    <Link href="/" className="flex items-center gap-3 py-3" onClick={() => setIsOpen(false)}>
                      <FiHome className="h-5 w-5" />
                      <span className="font-medium">Home</span>
                    </Link>
                    <Link href="/insights" className="flex items-center gap-3 py-3" onClick={() => setIsOpen(false)}>
                      <FiLayers className="h-5 w-5" />
                      <span className="font-medium">Insights</span>
                    </Link>
                    <Link href="/insights/series" className="flex items-center gap-3 py-3" onClick={() => setIsOpen(false)}>
                      <FiList className="h-5 w-5" />
                      <span className="font-medium">Series</span>
                    </Link>
                    <Link href="/apps" className="flex items-center gap-3 py-3" onClick={() => setIsOpen(false)}>
                      <FiLayers className="h-5 w-5" />
                      <span className="font-medium">Apps</span>
                    </Link>
                    <Link href="/videos" className="flex items-center gap-3 py-3" onClick={() => setIsOpen(false)}>
                      <FiVideo className="h-5 w-5" />
                      <span className="font-medium">Videos</span>
                    </Link>
                    <Link href="/about" className="flex items-center gap-3 py-3" onClick={() => setIsOpen(false)}>
                      <FiUser className="h-5 w-5" />
                      <span className="font-medium">About</span>
                    </Link>
                    <Link href="/contact" className="flex items-center gap-3 py-3" onClick={() => setIsOpen(false)}>
                      <FiEdit className="h-5 w-5" />
                      <span className="font-medium">Contact Me</span>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};
