"use client";

import { useState } from "react";
import Link from "next/link";
import { getLastVisitedStage } from "@/lib/progress-storage";
import { getStageBySlug } from "@/lib/stage-utils";
import type { Stage } from "@/types/guide";

export function ContinueLearning() {
  const [stage] = useState<Stage | null>(() => {
    if (typeof window === 'undefined') return null;
    const slug = getLastVisitedStage();
    if (!slug) return null;
    return getStageBySlug(slug) ?? null;
  });

  if (!stage) return null;

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[hsl(var(--primary))]/15 bg-[hsl(var(--primary))]/5 px-5 py-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-sm font-semibold tabular-nums text-[hsl(var(--primary))]">
          {stage.id}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-0.5">
            Tiếp tục học
          </p>
          <p className="text-sm font-semibold text-foreground truncate">
            {stage.title}
          </p>
        </div>
      </div>
      <Link
        href={`/stages/${stage.slug}`}
        className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] transition-colors hover:bg-[hsl(var(--primary))]/90"
      >
        Tiếp tục
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--primary-foreground))]" />
        </svg>
      </Link>
    </div>
  );
}
