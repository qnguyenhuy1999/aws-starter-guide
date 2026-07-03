import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Stage } from "@/types/guide";
import { cn } from "@/lib/utils";

interface PrevNextNavigationProps {
  prev?: Stage;
  next?: Stage;
  className?: string;
}

export function PrevNextNavigation({ prev, next, className }: PrevNextNavigationProps) {
  return (
    <div className={cn("flex gap-4 mt-12 pt-8 border-t border-[hsl(var(--border))]", className)}>
      {prev ? (
        <Link
          href={`/stages/${prev.slug}`}
          className="flex-1 flex items-center gap-3 p-4 rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--accent))] transition-colors group"
        >
          <ChevronLeft className="h-5 w-5 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Trước đó</p>
            <p className="text-sm font-medium truncate">{prev.title}</p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/stages/${next.slug}`}
          className="flex-1 flex items-center justify-end gap-3 p-4 rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--accent))] transition-colors group text-right"
        >
          <div className="min-w-0">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Tiếp theo</p>
            <p className="text-sm font-medium truncate">{next.title}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] shrink-0" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
