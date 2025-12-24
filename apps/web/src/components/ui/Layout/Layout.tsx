"use client";

import { FC } from "react";
import { Footer, Header } from "./";

interface LayoutProps {
  children: React.ReactNode;
  metaTitle: string;
  metaDescription: string;
  ogPhoto?: string;
  ogUrl?: string;
}

export const Layout: FC<LayoutProps> = ({ children, metaTitle, metaDescription, ogPhoto, ogUrl }) => {
  return (
    <section className="overflow-y-auto">
      <Header />
      <div className="container mx-auto pt-4 lg:pt-8 pb-12 lg:pb-24">
        {children}
      </div>
      <Footer />
    </section>
  );
};
