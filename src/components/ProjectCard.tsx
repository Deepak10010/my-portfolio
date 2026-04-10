import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug">{project.title}</CardTitle>
          {project.featured && (
            <Badge variant="secondary" className="shrink-0 text-xs">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs font-normal">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-4 pt-0">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub →
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Live →
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
