"use client";

import { useState } from "react";
import { LayoutList, LayoutGrid } from "lucide-react";
import { stages } from "@/content/stages";
import { RoadmapCard } from "@/components/guide/roadmap-card";
import { RoadmapTimeline } from "@/components/guide/roadmap-timeline";
import { getCompletedStages } from "@/lib/progress-storage";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ViewMode = "timeline" | "grid";

export default function RoadmapPage() {
  const [completedStageIds] = useState<number[]>(() =>
    typeof window !== 'undefined' ? getCompletedStages() : []
  );
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");

  const totalStages = stages.length;
  const completedCount = completedStageIds.length;
  const progressPercent = totalStages > 0 ? (completedCount / totalStages) * 100 : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Lộ trình học AWS
        </h1>
        <p className="mt-2 text-[hsl(var(--muted-foreground))]">
          Theo từng giai đoạn từ cơ bản đến nâng cao — hoàn thành theo thứ tự để xây dựng kiến thức vững chắc.
        </p>
      </div>

      {/* Progress section */}
      <div className="mb-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">
            Tiến độ tổng quan
          </span>
          <span className="font-variant-numeric tabular-nums text-sm font-semibold text-[hsl(var(--primary))]">
            {completedCount}/{totalStages} giai đoạn
          </span>
        </div>
        <Progress value={progressPercent} className="h-2.5" />
        {completedCount > 0 && (
          <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
            Bạn đã hoàn thành{" "}
            <span className="font-semibold text-[hsl(var(--foreground))]">
              {Math.round(progressPercent)}%
            </span>{" "}
            lộ trình.
          </p>
        )}
      </div>

      {/* View toggle */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-sm text-[hsl(var(--muted-foreground))]">Hiển thị:</span>
        <div className="inline-flex rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 p-0.5">
          <ToggleButton
            active={viewMode === "timeline"}
            onClick={() => setViewMode("timeline")}
            icon={<LayoutList className="h-3.5 w-3.5" />}
            label="Dạng Timeline"
          />
          <ToggleButton
            active={viewMode === "grid"}
            onClick={() => setViewMode("grid")}
            icon={<LayoutGrid className="h-3.5 w-3.5" />}
            label="Dạng Lưới"
          />
        </div>
      </div>

      {/* Content */}
      {viewMode === "timeline" ? (
        <RoadmapTimeline stages={stages} completedStageIds={completedStageIds} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stages.map((stage) => (
            <RoadmapCard
              key={stage.id}
              stage={stage}
              isCompleted={completedStageIds.includes(stage.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ToggleButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function ToggleButton({ active, onClick, icon, label }: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-1",
        active
          ? "bg-[hsl(var(--background))] text-[hsl(var(--foreground))] shadow-sm"
          : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
      )}
      aria-pressed={active}
    >
      {icon}
      {label}
    </button>
  );
}
