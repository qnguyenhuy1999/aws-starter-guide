import { GlossaryTerm } from "@/types/guide";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GlossaryTermCardProps {
  term: GlossaryTerm;
}

export default function GlossaryTermCard({ term }: GlossaryTermCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg leading-snug">{term.term}</CardTitle>
          <Badge variant="secondary" className="shrink-0 mt-0.5">
            {term.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {term.definition}
        </p>
        {term.relatedTerms && term.relatedTerms.length > 0 && (
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Related: </span>
            {term.relatedTerms.map((related, index) => (
              <span key={related}>
                <a
                  href={`#${related.toLowerCase().replace(/\s+/g, "-")}`}
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  {related}
                </a>
                {index < term.relatedTerms!.length - 1 && (
                  <span className="mx-1">·</span>
                )}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
