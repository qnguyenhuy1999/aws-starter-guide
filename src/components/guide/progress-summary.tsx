"use client";

import { useState } from "react";
import { getProgress, getAllChecklists, getAllQuizResults } from "@/lib/progress-storage";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const TOTAL_STAGES = 16;

function getMotivationalMessage(percent: number): { text: string; emoji: string } {
  if (percent === 0) {
    return { text: "Hành trình nghìn dặm bắt đầu từ một bước chân.", emoji: "🚀" };
  }
  if (percent < 25) {
    return { text: "Khởi đầu tốt! Tiếp tục xây dựng nền tảng AWS của bạn.", emoji: "🌱" };
  }
  if (percent < 50) {
    return { text: "Đang tiến bộ! Bạn đang xây dựng kỹ năng cloud vững chắc.", emoji: "⚡" };
  }
  if (percent < 75) {
    return { text: "Hơn nửa đường rồi! Kiến thức AWS của bạn đang lên một tầm cao mới.", emoji: "🎯" };
  }
  if (percent < 100) {
    return { text: "Sắp đến đích! Chỉ còn một chút nữa để thành thạo AWS.", emoji: "🏆" };
  }
  return { text: "Xuất sắc! Bạn đã hoàn thành toàn bộ lộ trình AWS Starter Guide.", emoji: "🎉" };
}

interface StatCardProps {
  value: number | string;
  label: string;
  sublabel?: string;
  highlight?: boolean;
}

function StatCard({ value, label, sublabel, highlight }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-xl border p-4 flex-1 min-w-0",
        highlight
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card"
      )}
    >
      <span
        className={cn(
          "text-3xl font-bold tabular-nums leading-none tracking-tight",
          highlight ? "text-primary" : "text-foreground"
        )}
      >
        {value}
      </span>
      <span className="text-sm font-medium text-foreground leading-snug">{label}</span>
      {sublabel && (
        <span className="text-xs text-muted-foreground leading-snug">{sublabel}</span>
      )}
    </div>
  );
}

export function ProgressSummary() {
  const [completedStages] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    return getProgress().completedStages ?? [];
  });
  const [totalChecklistDone] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return Object.values(getAllChecklists()).filter(Boolean).length;
  });
  const [totalQuizDone] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return Object.keys(getAllQuizResults()).length;
  });

  const stagesCompleted = completedStages.length;
  const progressPercent = Math.round((stagesCompleted / TOTAL_STAGES) * 100);
  const { text: motivationalText, emoji } = getMotivationalMessage(progressPercent);

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-foreground">Tiến độ học tập</h2>
        <span className="text-xs font-medium text-muted-foreground tabular-nums">
          {progressPercent}% hoàn thành
        </span>
      </div>

      {/* Stats row */}
      <div className="flex flex-row gap-3 flex-wrap">
        <StatCard
          value={`${stagesCompleted}/${TOTAL_STAGES}`}
          label="Giai đoạn hoàn thành"
          sublabel="stages completed"
          highlight
        />
        <StatCard
          value={totalChecklistDone}
          label="Checklist items"
          sublabel="tasks checked off"
        />
        <StatCard
          value={totalQuizDone}
          label="Quiz đã làm"
          sublabel="quizzes attempted"
        />
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Tiến độ giai đoạn</span>
          <span className="tabular-nums font-medium">
            {stagesCompleted} / {TOTAL_STAGES}
          </span>
        </div>
        <Progress
          value={progressPercent}
          className="h-2.5"
        />
      </div>

      {/* Motivational message */}
      <div className="flex items-start gap-3 rounded-lg bg-muted/50 border border-border/60 px-4 py-3">
        <span className="text-xl leading-none mt-0.5" role="img" aria-label="motivation">
          {emoji}
        </span>
        <p className="text-sm text-muted-foreground leading-relaxed">{motivationalText}</p>
      </div>
    </div>
  );
}
