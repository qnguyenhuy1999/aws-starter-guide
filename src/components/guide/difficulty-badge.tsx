import { cn } from "@/lib/utils";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils";
import type { Difficulty } from "@/types/guide";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        getDifficultyColor(difficulty),
        className
      )}
    >
      {getDifficultyLabel(difficulty)}
    </span>
  );
}
