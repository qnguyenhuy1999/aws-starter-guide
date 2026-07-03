"use client";

import { useState, useMemo } from "react";
import { BookOpen } from "lucide-react";
import { resources } from "@/content/resources";
import ResourceCard from "@/components/guide/resource-card";
import { cn } from "@/lib/utils";

type ResourceType = "all" | "official" | "video" | "course" | "book" | "tool";

const TYPE_FILTERS: { value: ResourceType; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "official", label: "Official" },
  { value: "video", label: "Video" },
  { value: "course", label: "Course" },
  { value: "book", label: "Book" },
  { value: "tool", label: "Tool" },
];

export default function ResourcesPage() {
  const [selectedType, setSelectedType] = useState<ResourceType>("all");
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const typeMatch = selectedType === "all" || r.type === selectedType;
      const freeMatch = !showFreeOnly || r.isFree;
      return typeMatch && freeMatch;
    });
  }, [selectedType, showFreeOnly]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-8">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="h-6 w-6 text-[hsl(var(--primary))]" />
          <h1 className="text-2xl font-bold tracking-tight">
            Tài nguyên học tập
          </h1>
          <span className="ml-1 text-sm text-[hsl(var(--muted-foreground))] font-normal">
            ({filtered.length} tài nguyên)
          </span>
        </div>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Tổng hợp tài liệu, khóa học, video và công cụ hỗ trợ học AWS.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Type filter pills */}
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSelectedType(value)}
              className={cn(
                "text-sm px-3 py-1.5 rounded-full border font-medium transition-colors",
                selectedType === value
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--primary))]"
                  : "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-[hsl(var(--border))]" />

        {/* Free only toggle */}
        <button
          type="button"
          onClick={() => setShowFreeOnly((v) => !v)}
          className="flex items-center gap-2 rounded-full px-1 py-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2"
          aria-pressed={showFreeOnly}
          aria-label="Chỉ hiển thị tài nguyên miễn phí"
        >
          <span
            aria-hidden="true"
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors",
              showFreeOnly ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--muted))]"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 rounded-full bg-[hsl(var(--background))] shadow-sm transition-transform",
                showFreeOnly ? "translate-x-4" : "translate-x-0"
              )}
            />
          </span>
          <span className="text-sm text-[hsl(var(--foreground))]">
            Miễn phí
          </span>
        </button>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-[hsl(var(--muted-foreground))] py-10 text-center">
          Không tìm thấy tài nguyên phù hợp.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
}
