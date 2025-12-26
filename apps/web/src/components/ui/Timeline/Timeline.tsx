import { format } from "date-fns";
import { Award, GraduationCap, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export interface TimelineEvent {
  date: Date;
  title: string;
  description?: string;
  type: "education" | "award" | "certification" | "milestone";
  icon?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  link?: string;
  badge?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  // Sort events by date (newest first)
  const sortedEvents = [...events].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Timeline line - centered */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block transform -translate-x-1/2" />

      <div className="space-y-8 md:space-y-12">
        {sortedEvents.map((event, index) => {
          const iconElement = event.icon || getDefaultIcon(event.type);
          const formattedDate = format(event.date, "MMMM yyyy");
          const isEven = index % 2 === 0;
          // On desktop: alternate sides. On mobile: always left
          const isLeftSide = isEven;

          return (
            <div key={index} className="relative">
              <div className={`flex flex-col md:flex-row gap-6 md:gap-8 ${isLeftSide ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Icon/Date Circle - centered on timeline */}
                <div className="flex-shrink-0 relative z-10 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                  <div className="w-16 h-16 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center shadow-md">
                    <div className="text-primary">{iconElement}</div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 md:hidden">
                    <p className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                {/* Content - alternates sides on desktop */}
                <div className={`flex-1 pt-2 pb-8 md:pt-0 ${isLeftSide ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className={`flex flex-col gap-4 ${isLeftSide ? 'md:items-end' : 'md:items-start'}`}>
                        {/* Image if available */}
                        {event.image && (
                          <div className="flex-shrink-0">
                            {event.link ? (
                              <Link href={event.link} target="_blank" rel="noopener noreferrer">
                                <Image
                                  src={event.image}
                                  alt={event.imageAlt || event.title}
                                  width={100}
                                  height={100}
                                  className="rounded-lg object-contain hover:opacity-80 transition-opacity"
                                />
                              </Link>
                            ) : (
                              <Image
                                src={event.image}
                                alt={event.imageAlt || event.title}
                                width={100}
                                height={100}
                                className="rounded-lg object-contain"
                              />
                            )}
                          </div>
                        )}

                        {/* Text Content */}
                        <div className={`space-y-2 ${isLeftSide ? 'md:text-right' : 'md:text-left'}`}>
                          <div className={`flex flex-col gap-2 ${isLeftSide ? 'md:items-end' : 'md:items-start'}`}>
                            <div className={`flex items-center gap-2 ${isLeftSide ? 'md:flex-row-reverse' : ''}`}>
                              <h3 className="text-lg font-semibold">{event.title}</h3>
                              {event.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {event.badge}
                                </Badge>
                              )}
                            </div>
                            <div className={`flex items-center gap-2 text-sm text-muted-foreground ${isLeftSide ? 'md:flex-row-reverse' : ''}`}>
                              <Calendar className="h-4 w-4" />
                              <time dateTime={event.date.toISOString()} className="hidden md:inline">
                                {formattedDate}
                              </time>
                            </div>
                          </div>
                          {event.description && (
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          )}
                          {event.link && (
                            <Link
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-sm text-primary hover:underline inline-flex items-center gap-1 ${isLeftSide ? 'md:flex-row-reverse' : ''}`}
                            >
                              View details
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for opposite side on desktop */}
                <div className="hidden md:block flex-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getDefaultIcon(type: TimelineEvent["type"]) {
  switch (type) {
    case "education":
      return <GraduationCap className="h-6 w-6" />;
    case "award":
      return <Award className="h-6 w-6" />;
    case "certification":
      return <Award className="h-6 w-6" />;
    default:
      return <Calendar className="h-6 w-6" />;
  }
}

