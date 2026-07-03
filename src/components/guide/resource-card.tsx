import { ExternalLink } from "lucide-react";
import { Resource } from "@/types/guide";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TYPE_CONFIG: Record<
  Resource["type"],
  { label: string; badgeVariant: "default" | "secondary" | "outline" }
> = {
  official: {
    label: "Official",
    badgeVariant: "secondary",
  },
  video: {
    label: "Video",
    badgeVariant: "outline",
  },
  course: {
    label: "Course",
    badgeVariant: "default",
  },
  book: {
    label: "Book",
    badgeVariant: "secondary",
  },
  tool: {
    label: "Tool",
    badgeVariant: "outline",
  },
};

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const typeConfig = TYPE_CONFIG[resource.type];

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant={typeConfig.badgeVariant} className="text-xs font-medium">
            {typeConfig.label}
          </Badge>
          {resource.isFree ? (
            <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] text-xs font-medium">
              Miễn phí
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs font-medium">
              Có phí
            </Badge>
          )}
        </div>
        <CardTitle className="text-base leading-snug">{resource.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 gap-4 pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {resource.description}
        </p>

        {resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {resource.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs font-normal px-2 py-0.5"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "sm", variant: "outline" }), "mt-auto w-full")}
        >
          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
          Xem tài nguyên
        </a>
      </CardContent>
    </Card>
  );
}
