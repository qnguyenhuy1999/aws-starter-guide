import type { Stage } from "@/types/guide";
import { stages } from "@/content/stages";

export function getStageBySlug(slug: string): Stage | undefined {
  return stages.find((s) => s.slug === slug);
}

export function getStageById(id: number): Stage | undefined {
  return stages.find((s) => s.id === id);
}

export function getPrevStage(currentId: number): Stage | undefined {
  return stages.find((s) => s.id === currentId - 1);
}

export function getNextStage(currentId: number): Stage | undefined {
  return stages.find((s) => s.id === currentId + 1);
}

export function getAllStageSlugs(): string[] {
  return stages.map((s) => s.slug);
}

export function getTotalStats() {
  const totalLabs = stages.reduce((acc: number, s: Stage) => acc + s.labs.length, 0);
  const totalChecklist = stages.reduce((acc: number, s: Stage) => acc + s.checklist.length, 0);
  const totalQuiz = stages.reduce((acc: number, s: Stage) => acc + s.quiz.length, 0);
  return {
    totalStages: stages.length,
    totalLabs,
    totalChecklist,
    totalQuiz,
    estimatedWeeks: 16,
  };
}
