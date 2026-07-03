"use client";

import { useState } from "react";
import { stages } from "@/content/stages";
import {
  getCompletedStages,
  getAllChecklists,
  getAllQuizResults,
  resetAllProgress,
} from "@/lib/progress-storage";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
}: {
  label: string;
  value: number;
  max?: number;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        minWidth: 0,
      }}
    >
      <span
        style={{
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: "28px",
          fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
          color: accent ? "var(--accent)" : "var(--text)",
          lineHeight: 1.1,
        }}
      >
        {value}
        {max !== undefined && (
          <span style={{ fontSize: "16px", fontWeight: 400, color: "var(--muted)", marginLeft: "4px" }}>
            / {max}
          </span>
        )}
      </span>
    </div>
  );
}

function StageRow({
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
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "28px 1fr 120px 120px 100px",
        alignItems: "center",
        gap: "12px",
        padding: "14px 16px",
        borderRadius: "8px",
        background: isCompleted ? "rgba(79, 142, 247, 0.04)" : "transparent",
        borderLeft: isCompleted ? "2px solid var(--accent)" : "2px solid transparent",
        transition: "background 0.15s",
      }}
    >
      {/* Index */}
      <span
        style={{
          fontSize: "11px",
          fontVariantNumeric: "tabular-nums",
          color: "var(--muted)",
          fontWeight: 500,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title */}
      <span
        style={{
          fontSize: "14px",
          color: isCompleted ? "var(--text)" : "var(--muted-text)",
          fontWeight: isCompleted ? 500 : 400,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {stage.title}
      </span>

      {/* Checklist */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {checklistTotal > 0 ? (
          <>
            <div
              style={{
                flex: 1,
                height: "4px",
                background: "var(--border)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${checklistTotal > 0 ? (checklistCount / checklistTotal) * 100 : 0}%`,
                  background: checklistCount === checklistTotal ? "var(--success)" : "var(--accent)",
                  borderRadius: "2px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "12px",
                fontVariantNumeric: "tabular-nums",
                color: "var(--muted)",
                whiteSpace: "nowrap",
              }}
            >
              {checklistCount}/{checklistTotal}
            </span>
          </>
        ) : (
          <span style={{ fontSize: "12px", color: "var(--border)" }}>—</span>
        )}
      </div>

      {/* Quiz */}
      <div>
        {quizResult ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "12px",
              fontVariantNumeric: "tabular-nums",
              fontWeight: 500,
              color: quizResult.score >= quizResult.total ? "var(--success)" : "#f87171",
              background: quizResult.score >= quizResult.total ? "rgba(34,197,94,0.1)" : "rgba(248,113,113,0.1)",
              borderRadius: "5px",
              padding: "3px 8px",
            }}
          >
            <span>{quizResult.score >= quizResult.total ? "✓" : "✗"}</span>
            {quizResult.score}/{quizResult.total}
          </span>
        ) : (
          <span style={{ fontSize: "12px", color: "var(--border)" }}>—</span>
        )}
      </div>

      {/* Status badge */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span
          style={{
            display: "inline-block",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            padding: "3px 10px",
            borderRadius: "20px",
            background: isCompleted ? "rgba(34,197,94,0.12)" : "var(--surface)",
            color: isCompleted ? "var(--success)" : "var(--muted)",
            border: isCompleted ? "1px solid rgba(34,197,94,0.25)" : "1px solid var(--border)",
          }}
        >
          {isCompleted ? "Hoàn thành" : "Chưa xong"}
        </span>
      </div>
    </div>
  );
}

export default function ProgressPage() {
  const [data, setData] = useState<ProgressData>(() =>
    typeof window !== 'undefined'
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
    <>
      <style>{`
        :root {
          --bg: #0f1117;
          --surface: #16192a;
          --border: #252836;
          --accent: #4f8ef7;
          --success: #22c55e;
          --text: #e2e6f0;
          --muted: #6b7585;
          --muted-text: #a0a8b8;
        }

        .progress-page {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
          padding: 40px 24px 80px;
        }

        .progress-inner {
          max-width: 860px;
          margin: 0 auto;
        }

        .page-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 10px;
        }

        .page-title {
          font-size: clamp(24px, 4vw, 32px);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 6px;
          line-height: 1.2;
        }

        .page-subtitle {
          font-size: 14px;
          color: var(--muted);
          margin: 0 0 36px;
        }

        .stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }

        @media (max-width: 560px) {
          .stat-grid {
            grid-template-columns: 1fr;
          }
        }

        .progress-bar-section {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 20px 24px;
          margin-bottom: 36px;
        }

        .progress-bar-label {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 12px;
        }

        .progress-bar-label-text {
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
        }

        .progress-bar-pct {
          font-size: 13px;
          font-variant-numeric: tabular-nums;
          font-weight: 600;
          color: var(--accent);
        }

        .stages-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .stages-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .table-header {
          display: grid;
          grid-template-columns: 28px 1fr 120px 120px 100px;
          gap: 12px;
          padding: 8px 16px;
          margin-bottom: 4px;
        }

        .table-header span {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .table-header span:last-child {
          text-align: right;
        }

        .stages-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .reset-section {
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 700px) {
          .table-header,
          .stage-row-inner {
            grid-template-columns: 28px 1fr 80px !important;
          }
          .col-quiz,
          .col-status {
            display: none;
          }
        }
      `}</style>

      <div className="progress-page">
        <div className="progress-inner">
          {/* Header */}
          <p className="page-eyebrow">AWS Starter Guide</p>
          <h1 className="page-title">Tiến độ học tập</h1>
          <p className="page-subtitle">Theo dõi quá trình học của bạn qua {totalStages} giai đoạn</p>

          {/* Stat cards */}
          <div className="stat-grid">
            <StatCard label="Giai đoạn hoàn thành" value={completedCount} max={totalStages} accent />
            <StatCard label="Checklist đã làm" value={totalChecklistDone} />
            <StatCard label="Bài quiz đạt" value={totalQuizzesPassed} />
          </div>

          {/* Progress bar */}
          <div className="progress-bar-section">
            <div className="progress-bar-label">
              <span className="progress-bar-label-text">Tổng tiến độ</span>
              <span className="progress-bar-pct">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} />
          </div>

          {/* Per-stage table */}
          <div className="stages-section-header">
            <span className="stages-label">Chi tiết từng giai đoạn</span>
          </div>

          <div className="table-header">
            <span>#</span>
            <span>Giai đoạn</span>
            <span>Checklist</span>
            <span>Quiz</span>
            <span style={{ textAlign: "right" }}>Trạng thái</span>
          </div>

          <div className="stages-list">
            {stages.map((stage, i) => {
              const stageItemIds = stage.checklist.map((c) => c.id);
              const checklistDoneCount = stageItemIds.filter((id) => data.checklists[id]).length;
              const checklistTotalCount = stageItemIds.length;
              const quizResult = data.quizResults[stage.slug];
              const isCompleted = data.completedStageIds.includes(stage.id);

              return (
                <StageRow
                  key={stage.id}
                  stage={stage}
                  index={i}
                  isCompleted={isCompleted}
                  checklistCount={checklistDoneCount}
                  checklistTotal={checklistTotalCount}
                  quizResult={quizResult}
                />
              );
            })}
          </div>

          {/* Reset */}
          <div className="reset-section">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--muted)",
                    background: "transparent",
                    fontSize: "13px",
                  }}
                >
                  Đặt lại tiến độ
                </Button>
              </DialogTrigger>
              <DialogContent
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  borderRadius: "12px",
                }}
              >
                <DialogHeader>
                  <DialogTitle style={{ color: "var(--text)" }}>Xác nhận đặt lại</DialogTitle>
                  <DialogDescription style={{ color: "var(--muted)" }}>
                    Thao tác này sẽ xóa toàn bộ tiến độ học tập, bao gồm checklist và kết quả quiz. Hành động này không thể hoàn tác.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter style={{ gap: "8px" }}>
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--muted)",
                      background: "transparent",
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleReset}
                    style={{
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Đặt lại tất cả
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
