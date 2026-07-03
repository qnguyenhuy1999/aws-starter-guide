import Link from "next/link";
import { CheckCircle, Clock } from "lucide-react";
import { DifficultyBadge } from "@/components/guide/difficulty-badge";
import { ServiceBadge } from "@/components/guide/service-badge";
import type { Stage } from "@/types/guide";

interface RoadmapTimelineProps {
  stages: Stage[];
  completedStageIds: number[];
}

export function RoadmapTimeline({ stages, completedStageIds }: RoadmapTimelineProps) {
  return (
    <ol className="relative flex flex-col">
      {stages.map((stage, index) => {
        const isCompleted = completedStageIds.includes(stage.id);
        const isLast = index === stages.length - 1;
        const visibleServices = stage.services.slice(0, 3);

        return (
          <li key={stage.id} className="relative flex gap-4">
            {/* Vertical connector line */}
            <div className="flex flex-col items-center">
              <div
                className={[
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold",
                  isCompleted
                    ? "border-[hsl(var(--success))] bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]"
                    : "border-primary bg-background text-primary",
                ].join(" ")}
                aria-label={`Stage ${stage.id}`}
              >
                {stage.id}
              </div>
              {!isLast && (
                <div
                  className={[
                    "mt-1 w-0.5 flex-1",
                    isCompleted ? "bg-[hsl(var(--success))]" : "bg-border",
                  ].join(" ")}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Content */}
            <div className={["pb-8 pt-0.5", isLast ? "pb-0" : ""].join(" ")}>
              <div className="flex items-start gap-2">
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  {stage.title}
                </h3>
                {isCompleted && (
                  <CheckCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--success))]"
                    aria-label="Completed"
                  />
                )}
              </div>

              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <DifficultyBadge difficulty={stage.difficulty} />
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {stage.estimatedTime}
                </span>
              </div>

              {visibleServices.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {visibleServices.map((service) => (
                    <ServiceBadge key={service} service={service} />
                  ))}
                </div>
              )}

              <Link
                href={`/stages/${stage.slug}`}
                className="mt-3 inline-block text-xs font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Xem chi tiết
              </Link>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
