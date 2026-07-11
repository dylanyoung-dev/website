import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IProject } from "@/interfaces/IProject";

interface CurrentProjectCardProps {
  project: IProject;
}

export function CurrentProjectCard({ project }: CurrentProjectCardProps) {
  const externalUrl = project.project_url;

  return (
    <Card className="h-full overflow-hidden border-border/80">
      <CardContent className="flex h-full flex-col p-0">
        {project.thumbnailUrl ? (
          <div className="relative aspect-video w-full overflow-hidden border-b bg-muted/30">
            <Image
              src={project.thumbnailUrl}
              alt={project.thumbnail?.alt ?? project.title}
              fill
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            {project.short_description ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.short_description}
              </p>
            ) : null}
          </div>

          {project.technologies?.length ? (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-2">
            {externalUrl ? (
              <Button asChild variant="outline" size="sm">
                <Link href={externalUrl} target="_blank" rel="noopener noreferrer">
                  Visit
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : null}
            {project.github_url ? (
              <Button asChild variant="ghost" size="sm">
                <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                  GitHub
                  <Github className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface CurrentProjectsProps {
  projects: IProject[];
}

export function CurrentProjects({ projects }: CurrentProjectsProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Current Projects
        </h2>
        <p className="max-w-3xl text-muted-foreground">
          What I&apos;m building and experimenting with right now — side projects,
          proofs of concept, and products in motion.
        </p>
      </div>

      {projects.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <CurrentProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No current projects flagged yet. Check back soon.
        </p>
      )}
    </section>
  );
}
