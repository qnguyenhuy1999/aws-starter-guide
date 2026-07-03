import { ExternalLink } from "lucide-react";
import { Resource } from "@/types/guide";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TYPE_CONFIG: Record<
  Resource["type"],
  { label: string; className: string }
> = {
  official: {
    label: "Official",
    className: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  },
  video: {
    label: "Video",
    className: "bg-red-100 text-red-700 hover:bg-red-100",
  },
  course: {
    label: "Course",
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  book: {
    label: "Book",
    className: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  },
  tool: {
    label: "Tool",
    className: "bg-purple-100 text-purple-700 hover:bg-purple-100",
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
          <Badge className={cn("text-xs font-medium", typeConfig.className)}>
            {typeConfig.label}
          </Badge>
          {resource.isFree ? (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-medium">
              Miễn phí
            </Badge>
          ) : (
            <Badge className="bg-muted text-muted-foreground hover:bg-muted text-xs font-medium">
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

        <a href={resource.url} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "sm" }), "w-full mt-auto")}>
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
            Xem tài nguyên
        </a>
      </CardContent>
    </Card>
  );
}
