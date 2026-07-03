"use client";

import { useState, useMemo } from "react";
import { FlaskConical } from "lucide-react";
import { stages } from "@/content/stages";
import { LabCard } from "@/components/guide/lab-card";

import type { Lab } from "@/types/guide";

interface LabWithStage extends Lab {
  stageName: string;
  stageId: number;
}

const allLabs: LabWithStage[] = stages.flatMap((s) =>
  s.labs.map((l) => ({ ...l, stageName: s.title, stageId: s.id }))
);

const stageOptions = stages
  .filter((s) => s.labs.length > 0)
  .map((s) => ({ id: s.id, title: s.title, count: s.labs.length }));

export default function LabsPage() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  const filteredLabs = useMemo(
    () =>
      selectedStage !== null
        ? allLabs.filter((l) => l.stageId === selectedStage)
        : allLabs,
    [selectedStage]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-8">
        <div className="flex items-center gap-2 mb-1">
          <FlaskConical className="h-6 w-6 text-[hsl(var(--warning))]" />
          <h1 className="text-2xl font-bold tracking-tight">Labs thực hành</h1>
          <span className="ml-1 text-sm text-[hsl(var(--muted-foreground))] font-normal">
            ({filteredLabs.length} lab{filteredLabs.length !== 1 ? "s" : ""})
          </span>
        </div>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Thực hành từng bước với các bài lab AWS theo từng giai đoạn.
        </p>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <label htmlFor="lab-stage-filter" className="mb-2 block text-sm font-medium text-[hsl(var(--foreground))]">
          Lọc theo giai đoạn
        </label>
        <select
          id="lab-stage-filter"
          value={selectedStage ?? ""}
          onChange={(e) =>
            setSelectedStage(e.target.value === "" ? null : Number(e.target.value))
          }
          className="text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/40 cursor-pointer"
        >
          <option value="">Tất cả giai đoạn ({allLabs.length})</option>
          {stageOptions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title} ({s.count})
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filteredLabs.length === 0 ? (
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Không có lab nào cho giai đoạn này.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLabs.map((lab) => (
            <LabCard key={lab.slug} lab={lab} />
          ))}
        </div>
      )}
    </div>
  );
}
