import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} phút`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}p` : `${hours} giờ`;
}

export function getDifficultyLabel(difficulty: string): string {
  const map: Record<string, string> = {
    beginner: "Cơ bản",
    intermediate: "Trung cấp",
    advanced: "Nâng cao",
  };
  return map[difficulty] ?? difficulty;
}

export function getDifficultyColor(difficulty: string): string {
  const map: Record<string, string> = {
    beginner: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950 dark:border-emerald-800",
    intermediate: "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950 dark:border-amber-800",
    advanced: "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800",
  };
  return map[difficulty] ?? "";
}

export function getServiceColor(service: string): string {
  const colorMap: Record<string, string> = {
    IAM: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    S3: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    EC2: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    VPC: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    RDS: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    DynamoDB: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    ElastiCache: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
    ALB: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
    Lambda: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    "API Gateway": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
    CloudWatch: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    CloudFront: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    ECS: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    Fargate: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  };
  return colorMap[service] ?? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
}

export function calculateProgress(completedCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return Math.round((completedCount / totalCount) * 100);
}
