import Link from "next/link";
import { Clock, ArrowRight, FlaskConical } from "lucide-react";
import type { Lab } from "@/types/guide";
import { cn } from "@/lib/utils";

interface LabCardProps {
  lab: Lab;
  className?: string;
}

export function LabCard({ lab, className }: LabCardProps) {
  return (
    <Link href={`/labs/${lab.slug}`}>
      <div className={cn(
        "group rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 hover:border-[hsl(var(--primary))]/40 hover:shadow-md transition-all cursor-pointer",
        className
      )}>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--warning))]/10">
            <FlaskConical className="h-5 w-5 text-[hsl(var(--warning))]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm group-hover:text-[hsl(var(--primary))] transition-colors">
              {lab.title}
            </h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 line-clamp-2">
              {lab.objective}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                <Clock className="h-3 w-3" />
                {lab.estimatedTime}
              </span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                {lab.steps.length} bước
              </span>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] shrink-0 mt-1 transition-colors" />
        </div>
      </div>
    </Link>
  );
}
