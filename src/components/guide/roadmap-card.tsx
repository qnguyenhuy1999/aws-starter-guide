import Link from "next/link";
import { Clock, ChevronRight, CheckCircle } from "lucide-react";
import { ServiceBadge } from "@/components/guide/service-badge";
import { DifficultyBadge } from "@/components/guide/difficulty-badge";
import { cn } from "@/lib/utils";
import type { Stage } from "@/types/guide";

interface RoadmapCardProps {
  stage: Stage;
  isCompleted?: boolean;
  className?: string;
}

export function RoadmapCard({ stage, isCompleted = false, className }: RoadmapCardProps) {
  return (
    <Link href={`/stages/${stage.slug}`}>
      <div className={cn(
        "group relative rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-[hsl(var(--primary))]/30 cursor-pointer",
        isCompleted
          ? "border-[hsl(var(--success))]/20 bg-[hsl(var(--success))]/8"
          : "border-[hsl(var(--border))] bg-[hsl(var(--card))]",
        className
      )}>
        {isCompleted && (
          <div className="absolute top-4 right-4">
            <CheckCircle className="h-5 w-5 text-[hsl(var(--success))]" />
          </div>
        )}
        <div className="flex items-start gap-4">
          <div className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0",
            isCompleted
              ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
              : "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
          )}>
            {stage.id}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base group-hover:text-[hsl(var(--primary))] transition-colors">
              {stage.title}
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5 line-clamp-2">
              {stage.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <DifficultyBadge difficulty={stage.difficulty} />
              <span className="inline-flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                <Clock className="h-3 w-3" />
                {stage.estimatedTime}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {stage.services.slice(0, 4).map((s) => (
                <ServiceBadge key={s} service={s} />
              ))}
              {stage.services.length > 4 && (
                <span className="text-xs text-[hsl(var(--muted-foreground))]">+{stage.services.length - 4}</span>
              )}
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] shrink-0 mt-1 transition-colors" />
        </div>
      </div>
    </Link>
  );
}
