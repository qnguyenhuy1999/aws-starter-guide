"use client";

import { useState } from "react";
import type { ElementType } from "react";
import { AlertTriangle, BarChart3, CheckCircle2, RotateCcw, ScrollText } from "lucide-react";
import { stages } from "@/content/stages";
import {
  getCompletedStages,
  getAllChecklists,
  getAllQuizResults,
  resetAllProgress,
} from "@/lib/progress-storage";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProgressData {
  completedStageIds: number[];
  checklists: Record<string, boolean>;
  quizResults: Record<string, { score: number; total: number; answers: Record<string, string> }>;
}

function StatCard({
  label,
  value,
  max,
  accent,
  icon: Icon,
}: {
  label: string;
  value: number;
  max?: number;
  accent?: boolean;
  icon: ElementType;
}) {
  return (
    <Card className={cn("border-[hsl(var(--border))]/80", accent && "border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/5")}>
      <CardContent className="flex items-center gap-4 p-5">
        <div className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
          accent
            ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
            : "bg-[hsl(var(--muted))]/50 text-[hsl(var(--muted-foreground))]"
        )}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-bold tabular-nums leading-none text-foreground">
            {value}
            {max !== undefined && (
              <span className="ml-1 text-sm font-medium text-muted-foreground">/ {max}</span>
            )}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function StageCard({
  stage,
  index,
  isCompleted,
  checklistCount,
  checklistTotal,
  quizResult,
}: {
  stage: { id: number; title: string; slug: string; checklist: { id: string; label: string }[] };
  index: number;
  isCompleted: boolean;
  checklistCount: number;
  checklistTotal: number;
  quizResult?: { score: number; total: number; answers: Record<string, string> };
}) {
  const progressValue = checklistTotal ? (checklistCount / checklistTotal) * 100 : 0;
  const quizPassed = quizResult ? quizResult.score >= quizResult.total : false;

  return (
    <Card className={cn(
      "border-[hsl(var(--border))]/80 transition-all hover:-translate-y-0.5 hover:shadow-lg",
      isCompleted && "border-[hsl(var(--success))]/20 bg-[hsl(var(--success))]/5"
    )}>
      <CardContent className="space-y-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold tabular-nums",
              isCompleted
                ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
                : "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
            )}>
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Stage {stage.id}
              </p>
              <h3 className="mt-1 text-base font-semibold leading-snug text-foreground">
                {stage.title}
              </h3>
            </div>
          </div>

          <Badge
            variant={isCompleted ? "default" : "outline"}
            className={cn(
              "shrink-0",
              isCompleted && "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]"
            )}
          >
            {isCompleted ? "Hoàn thành" : "Chưa xong"}
          </Badge>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/25 p-4">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>Checklist</span>
              <span className="tabular-nums">{checklistCount}/{checklistTotal}</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>

          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/25 p-4">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>Quiz</span>
              {quizResult ? (
                <span className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium tabular-nums",
                  quizPassed
                    ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
                    : "bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))]"
                )}>
                  {quizPassed ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />}
                  {quizResult.score}/{quizResult.total}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">Chưa làm</span>
              )}
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              {quizResult
                ? quizPassed
                  ? "Đã hoàn thành quiz cho stage này."
                  : "Đã làm quiz nhưng chưa đạt điểm tối đa."
                : "Kết quả quiz sẽ xuất hiện sau khi bạn hoàn thành bài kiểm tra."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProgressPage() {
  const [data, setData] = useState<ProgressData>(() =>
    typeof window !== "undefined"
      ? {
          completedStageIds: getCompletedStages(),
          checklists: getAllChecklists(),
          quizResults: getAllQuizResults(),
        }
      : { completedStageIds: [], checklists: {}, quizResults: {} }
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleReset = () => {
    resetAllProgress();
    setData({ completedStageIds: [], checklists: {}, quizResults: {} });
    setDialogOpen(false);
  };

  const totalStages = stages.length;
  const completedCount = data.completedStageIds.length;
  const progressPercent = totalStages > 0 ? (completedCount / totalStages) * 100 : 0;
  const totalChecklistDone = Object.values(data.checklists).filter(Boolean).length;
  const totalQuizzesPassed = Object.values(data.quizResults).filter((r) => r.score >= r.total).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--muted))]/35 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--primary))]">
            Tiến độ học tập
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 px-3 py-1 text-xs text-muted-foreground">
            <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
            {Math.round(progressPercent)}% hoàn thành
          </span>
        </div>

        <div className="mt-5 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Theo dõi hành trình học AWS của bạn
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            Tiến độ được tổng hợp từ {totalStages} giai đoạn, checklist và quiz đã lưu trên thiết bị này.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <StatCard label="Giai đoạn hoàn thành" value={completedCount} max={totalStages} accent icon={ScrollText} />
          <StatCard label="Checklist đã làm" value={totalChecklistDone} icon={CheckCircle2} />
          <StatCard label="Quiz đạt" value={totalQuizzesPassed} icon={BarChart3} />
        </div>

        <div className="mt-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 p-5">
          <div className="mb-3 flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-foreground">Tổng tiến độ</span>
            <span className="tabular-nums text-muted-foreground">{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2.5" />
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Chi tiết
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">
              Từng giai đoạn
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Mỗi thẻ hiển thị checklist, quiz và trạng thái hoàn thành.
          </p>
        </div>

        <div className="grid gap-4">
          {stages.map((stage, index) => {
            const stageItemIds = stage.checklist.map((c) => c.id);
            const checklistDoneCount = stageItemIds.filter((id) => data.checklists[id]).length;
            const checklistTotalCount = stageItemIds.length;
            const quizResult = data.quizResults[stage.slug];
            const isCompleted = data.completedStageIds.includes(stage.id);

            return (
              <StageCard
                key={stage.id}
                stage={stage}
                index={index}
                isCompleted={isCompleted}
                checklistCount={checklistDoneCount}
                checklistTotal={checklistTotalCount}
                quizResult={quizResult}
              />
            );
          })}
        </div>
      </section>

      <div className="mt-10 flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <RotateCcw className="h-3.5 w-3.5" />
              Đặt lại tiến độ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Xác nhận đặt lại</DialogTitle>
              <DialogDescription>
                Thao tác này sẽ xoá toàn bộ checklist, kết quả quiz và trạng thái hoàn thành của các giai đoạn.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Hủy
              </Button>
              <Button variant="destructive" onClick={handleReset}>
                Đặt lại tất cả
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
