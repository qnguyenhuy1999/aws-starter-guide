"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { setChecklistItem, getChecklistItem } from "@/lib/progress-storage";
import type { ChecklistItem as ChecklistItemType } from "@/types/guide";
import { cn } from "@/lib/utils";

interface ChecklistProps {
  items: ChecklistItemType[];
  stageSlug: string;
}

export function Checklist({ items, stageSlug }: ChecklistProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    items.forEach((item) => {
      initialState[item.id] = getChecklistItem(`${stageSlug}:${item.id}`);
    });
    return initialState;
  });

  const handleChange = (itemId: string, value: boolean) => {
    setChecklistItem(`${stageSlug}:${itemId}`, value);
    setChecked((prev) => ({ ...prev, [itemId]: value }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 my-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">✅ Checklist</h3>
        <span className="text-sm text-[hsl(var(--muted-foreground))]">
          {completedCount}/{items.length} hoàn thành
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-[hsl(var(--muted))] rounded-full mb-6">
        <div
          className="h-2 bg-[hsl(var(--primary))] rounded-full transition-all duration-500"
          style={{ width: `${items.length ? (completedCount / items.length) * 100 : 0}%` }}
        />
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <Checkbox
              id={`${stageSlug}-${item.id}`}
              checked={checked[item.id] ?? false}
              onCheckedChange={(val) => handleChange(item.id, val === true)}
              className="mt-0.5"
            />
            <label
              htmlFor={`${stageSlug}-${item.id}`}
              className={cn(
                "cursor-pointer text-sm leading-relaxed flex-1",
                checked[item.id] && "line-through text-[hsl(var(--muted-foreground))]"
              )}
            >
              <span className="font-medium">{item.label}</span>
              {item.description && (
                <span className="block text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{item.description}</span>
              )}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
