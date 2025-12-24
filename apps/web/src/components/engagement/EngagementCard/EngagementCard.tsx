import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { IEngagement } from "@/interfaces/IEngagement";

interface EngagementCardProps {
  engagement: IEngagement;
}

export const EngagementCard: FC<EngagementCardProps> = ({ engagement }) => {
  return (
    <Card className="group">
      <CardContent className="p-0">
        <Link href={`/speaking/${engagement.slug.current}`} className="block">
          <div className="space-y-8">
            <div className="overflow-hidden">
              {engagement.thumbnail ? (
                <Image
                  src={engagement.thumbnailUrl}
                  alt={engagement.thumbnail?.alt ?? ""}
                  width={500}
                  height={260}
                  className="w-full h-60 object-cover transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <Image
                  src="https://source.unsplash.com/random/500x260"
                  alt="unsplash image"
                  width={500}
                  height={260}
                  className="w-full h-60 object-cover transition-transform duration-200 group-hover:scale-105"
                />
              )}
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-sm font-semibold">{engagement.title}</h3>
              <p className="text-sm text-muted-foreground">{engagement.short_description}</p>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
