"use client";

import {
  Field,
  Image,
  useInComposer,
  type Fields,
  type ImageValue,
  type ListRow,
} from "@amplifyup/sdk/react";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { hasImage } from "@/components/amplifyup/internal/fields";

/** Sanity `project` fields used on the card. */
type Project = {
  title: string;
  thumbnail?: ImageValue;
  short_description?: string;
  technologies?: string[];
  github_url?: string;
  project_url?: string;
};

function ProjectCard({ project }: { project: ListRow<Project> }) {
  const inComposer = useInComposer();
  const technologies = project.technologies?.value ?? [];
  const projectUrl = project.project_url?.value;
  const githubUrl = project.github_url?.value;

  return (
    <Card className="h-full overflow-hidden border-border/80">
      <CardContent className="flex h-full flex-col p-0">
        {project.thumbnail && (hasImage(project.thumbnail) || inComposer) ? (
          <div className="relative aspect-video w-full overflow-hidden border-b bg-muted/30">
            <Image
              field={project.thumbnail}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              <Field field={project.title} />
            </h3>
            {project.short_description &&
            (project.short_description.value || inComposer) ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                <Field field={project.short_description} />
              </p>
            ) : null}
          </div>

          {technologies.length ? (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-2">
            {projectUrl ? (
              <Button asChild variant="outline" size="sm">
                <a href={projectUrl} target="_blank" rel="noopener noreferrer">
                  Visit
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ) : null}
            {githubUrl ? (
              <Button asChild variant="ghost" size="sm">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                  <Github className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * AmplifyUP placeable `CurrentProjects` (/up-to). Bind `projects` to the
 * Sanity `project` Resource filtered to `isCurrent == true`. Section copy is
 * baked in (one-off).
 */
export function CurrentProjects({ fields }: { fields: Fields<{ projects: Project[] }> }) {
  const projects = (fields.projects?.value ?? []) as ListRow<Project>[];

  return (
    <section className="container mx-auto max-w-6xl space-y-6 px-4 py-8 md:py-12">
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
            <ProjectCard key={project.id} project={project} />
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
