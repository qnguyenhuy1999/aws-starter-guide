import { Clock, ChevronRight } from "lucide-react";
import { ServiceBadge } from "@/components/guide/service-badge";
import { DifficultyBadge } from "@/components/guide/difficulty-badge";
import { Breadcrumbs } from "@/components/app/breadcrumbs";
import type { Stage } from "@/types/guide";

interface StageHeaderProps {
  stage: Stage;
}

export function StageHeader({ stage }: StageHeaderProps) {
  return (
    <div className="mb-8">
      <Breadcrumbs
        items={[
          { label: "Giai đoạn", href: "/stages" },
          { label: stage.title },
        ]}
        className="mb-4"
      />

      <div className="flex items-center gap-2 mb-3">
        <span className="text-4xl font-black text-[hsl(var(--primary))]/20">
          {String(stage.id).padStart(2, "0")}
        </span>
        <div className="h-8 w-px bg-[hsl(var(--border))]" />
        <div className="flex flex-wrap gap-2">
          <DifficultyBadge difficulty={stage.difficulty} />
          <span className="inline-flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
            <Clock className="h-3.5 w-3.5" />
            {stage.estimatedTime}
          </span>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-2">{stage.title}</h1>
      <p className="text-lg text-[hsl(var(--muted-foreground))] mb-4">{stage.subtitle}</p>

      <div className="flex flex-wrap gap-2">
        {stage.services.map((service) => (
          <ServiceBadge key={service} service={service} />
        ))}
      </div>

      {stage.objectives.length > 0 && (
        <div className="mt-6 p-4 rounded-xl bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/10">
          <p className="text-sm font-semibold text-[hsl(var(--primary))] mb-2">Sau giai đoạn này, bạn sẽ:</p>
          <ul className="space-y-1">
            {stage.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-[hsl(var(--primary))] mt-0.5 shrink-0" />
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
