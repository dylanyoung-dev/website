import { Metadata } from "next";
import { Layout } from "@/components/ui/Layout/Layout";
import { Timeline, TimelineEvent } from "@/components/ui/Timeline";
import { Award, GraduationCap } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Dylan Young - Sitecore Developer & Technical Influencer",
  description: "Learn about Dylan Young, Sitecore MVP, software engineer, and technical influencer specializing in Sitecore, AI/ML, .NET, Python, React, and TypeScript.",
  openGraph: {
    title: "About Dylan Young - Sitecore Developer & Technical Influencer",
    description: "Learn about Dylan Young, Sitecore MVP, software engineer, and technical influencer.",
    type: "profile",
  },
};

export default function AboutPage() {
  const timelineEvents: TimelineEvent[] = [
    // Education
    {
      date: new Date("2006-06-01"),
      title: "Graduated College",
      description: "Completed undergraduate studies",
      type: "education",
      icon: <GraduationCap className="h-6 w-6" />,
    },
    // MVP Awards (announced in January each year)
    {
      date: new Date("2025-01-15"),
      title: "Sitecore MVP 2025",
      description: "Recognized as a Sitecore Most Valuable Professional in Technology",
      type: "award",
      icon: <Award className="h-6 w-6" />,
      image: "/images/2025-Technology.png",
      imageAlt: "Sitecore MVP 2025",
      link: "https://mvp.sitecore.com/en/Directory/Profile?id=29e76e11e5af446b367b08dd46ae56e7",
      badge: "Technology MVP",
    },
    {
      date: new Date("2022-01-15"),
      title: "Sitecore MVP 2022",
      description: "Recognized as a Sitecore Most Valuable Professional in Technology",
      type: "award",
      icon: <Award className="h-6 w-6" />,
      image: "/images/2022-Technology.png",
      imageAlt: "Sitecore MVP 2022",
      link: "https://mvp.sitecore.com/en/Directory/Profile?id=29e76e11e5af446b367b08dd46ae56e7",
      badge: "Technology MVP",
    },
    {
      date: new Date("2021-01-15"),
      title: "Sitecore MVP 2021",
      description: "Recognized as a Sitecore Most Valuable Professional in Technology",
      type: "award",
      icon: <Award className="h-6 w-6" />,
      image: "/images/2021-Technology.png",
      imageAlt: "Sitecore MVP 2021",
      link: "https://mvp.sitecore.com/en/Directory/Profile?id=29e76e11e5af446b367b08dd46ae56e7",
      badge: "Technology MVP",
    },
    {
      date: new Date("2020-01-15"),
      title: "Sitecore MVP 2020",
      description: "Recognized as a Sitecore Most Valuable Professional in Technology",
      type: "award",
      icon: <Award className="h-6 w-6" />,
      image: "/images/2020-Technology.png",
      imageAlt: "Sitecore MVP 2020",
      link: "https://mvp.sitecore.com/en/Directory/Profile?id=29e76e11e5af446b367b08dd46ae56e7",
      badge: "Technology MVP",
    },
    {
      date: new Date("2019-01-15"),
      title: "Sitecore MVP 2019",
      description: "Recognized as a Sitecore Most Valuable Professional in Technology",
      type: "award",
      icon: <Award className="h-6 w-6" />,
      image: "/images/2019-Technology.png",
      imageAlt: "Sitecore MVP 2019",
      link: "https://mvp.sitecore.com/en/Directory/Profile?id=29e76e11e5af446b367b08dd46ae56e7",
      badge: "Technology MVP",
    },
    {
      date: new Date("2018-01-15"),
      title: "Sitecore MVP 2018",
      description: "Recognized as a Sitecore Most Valuable Professional in Technology",
      type: "award",
      icon: <Award className="h-6 w-6" />,
      image: "/images/2018-Technology.png",
      imageAlt: "Sitecore MVP 2018",
      link: "https://mvp.sitecore.com/en/Directory/Profile?id=29e76e11e5af446b367b08dd46ae56e7",
      badge: "Technology MVP",
    },
  ];

  return (
    <Layout
      metaTitle="About Dylan Young - Sitecore Developer & Technical Influencer"
      metaDescription="Learn about Dylan Young, Sitecore MVP, software engineer, and technical influencer specializing in Sitecore, AI/ML, .NET, Python, React, and TypeScript."
    >
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
              <Image
                src="/images/dylan.jpg"
                alt="Dylan Young"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">Dylan Young</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Sitecore Developer & Technical Influencer
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Software engineer and technical influencer. I blog about my passions and curiosity in technology. 
              Here you&apos;ll find my thoughts related to Sitecore, AI/ML, .Net, Python, React, and TypeScript.
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">Career Timeline</h2>
            <p className="text-muted-foreground">
              Key milestones and achievements throughout my career
            </p>
          </div>
          <Timeline events={timelineEvents} />
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 pt-12 border-t space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
            <p className="text-lg text-muted-foreground">
              I&apos;m a passionate software engineer and technical influencer with a deep interest in 
              cutting-edge technologies. My expertise spans across Sitecore, artificial intelligence, 
              machine learning, and modern web development frameworks.
            </p>
            <p className="text-lg text-muted-foreground">
              As a multiple-time Sitecore MVP, I&apos;m committed to sharing knowledge and contributing 
              to the developer community. Through my blog, speaking engagements, and open-source 
              contributions, I aim to help others navigate the ever-evolving landscape of technology.
            </p>
            <p className="text-lg text-muted-foreground">
              When I&apos;m not coding or writing, you can find me exploring new technologies, 
              contributing to open-source projects, or sharing insights at conferences and meetups.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
