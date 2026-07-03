"use client";

import type { ProgressState } from "@/types/guide";

const KEYS = {
  COMPLETED_STAGES: "aws-guide:completed-stages",
  CHECKLISTS: "aws-guide:checklists",
  QUIZ_RESULTS: "aws-guide:quiz-results",
  LAST_VISITED_STAGE: "aws-guide:last-visited-stage",
} as const;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage quota exceeded or disabled
  }
}

export function getProgress(): ProgressState {
  return {
    completedStages: safeGet<number[]>(KEYS.COMPLETED_STAGES, []),
    checklists: safeGet<Record<string, boolean>>(KEYS.CHECKLISTS, {}),
    quizResults: safeGet(KEYS.QUIZ_RESULTS, {}),
    lastVisitedStage: safeGet<string | null>(KEYS.LAST_VISITED_STAGE, null),
  };
}

export function markStageCompleted(stageId: number): void {
  const completed = safeGet<number[]>(KEYS.COMPLETED_STAGES, []);
  if (!completed.includes(stageId)) {
    safeSet(KEYS.COMPLETED_STAGES, [...completed, stageId]);
  }
}

export function unmarkStageCompleted(stageId: number): void {
  const completed = safeGet<number[]>(KEYS.COMPLETED_STAGES, []);
  safeSet(KEYS.COMPLETED_STAGES, completed.filter((id) => id !== stageId));
}

export function isStageCompleted(stageId: number): boolean {
  const completed = safeGet<number[]>(KEYS.COMPLETED_STAGES, []);
  return completed.includes(stageId);
}

export function getCompletedStages(): number[] {
  return safeGet<number[]>(KEYS.COMPLETED_STAGES, []);
}

export function setChecklistItem(itemId: string, checked: boolean): void {
  const checklists = safeGet<Record<string, boolean>>(KEYS.CHECKLISTS, {});
  safeSet(KEYS.CHECKLISTS, { ...checklists, [itemId]: checked });
}

export function getChecklistItem(itemId: string): boolean {
  const checklists = safeGet<Record<string, boolean>>(KEYS.CHECKLISTS, {});
  return checklists[itemId] ?? false;
}

export function getAllChecklists(): Record<string, boolean> {
  return safeGet<Record<string, boolean>>(KEYS.CHECKLISTS, {});
}

export function saveQuizResult(
  stageSlug: string,
  score: number,
  total: number,
  answers: Record<string, string>
): void {
  const results = safeGet<ProgressState["quizResults"]>(KEYS.QUIZ_RESULTS, {});
  safeSet(KEYS.QUIZ_RESULTS, { ...results, [stageSlug]: { score, total, answers } });
}

export function getQuizResult(stageSlug: string): { score: number; total: number; answers: Record<string, string> } | null {
  const results = safeGet<ProgressState["quizResults"]>(KEYS.QUIZ_RESULTS, {});
  return results[stageSlug] ?? null;
}

export function getAllQuizResults(): ProgressState["quizResults"] {
  return safeGet(KEYS.QUIZ_RESULTS, {});
}

export function setLastVisitedStage(slug: string): void {
  safeSet(KEYS.LAST_VISITED_STAGE, slug);
}

export function getLastVisitedStage(): string | null {
  return safeGet<string | null>(KEYS.LAST_VISITED_STAGE, null);
}

export function resetAllProgress(): void {
  if (typeof window === "undefined") return;
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}
