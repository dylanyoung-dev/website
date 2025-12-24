"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FC, useState } from "react";
import { IPost } from "@/interfaces";
import { ISeries } from "@/interfaces/ISeries";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";
import Link from "next/link";

interface SeriesPostsProps {
  series: ISeries;
}

export const SeriesPosts: FC<SeriesPostsProps> = ({ series }) => {
  const [openIndex, setOpenIndex] = useState<string[]>(["0"]);

  const handleLinkClick = (index: number) => {
    setOpenIndex([index.toString()]);
  };

  return (
    <div className="flex flex-row gap-8 w-full max-w-6xl min-h-screen">
      <div className="flex flex-col gap-4 w-64">
        <h2 className="text-sm font-semibold">{series.title}</h2>
        {series.posts.map((post: IPost, index) => (
          <Link
            key={index}
            href={`#post-${index}`}
            onClick={() => handleLinkClick(index)}
            className="text-sm hover:underline"
          >
            {post.title}
          </Link>
        ))}
      </div>
      <div className="flex-1">
        <Accordion type="single" value={openIndex[0]} onValueChange={(value) => setOpenIndex([value])} collapsible>
          {series.posts.map((post: IPost, index) => (
            <AccordionItem key={index} value={index.toString()} id={`post-${index}`}>
              <AccordionTrigger>
                <h2 className="text-base font-medium flex-1 text-left">{post.title}</h2>
              </AccordionTrigger>
              <AccordionContent>
                {post.body && (
                  <div className="max-w-3xl">
                    <RenderMarkdown>{post.body}</RenderMarkdown>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
