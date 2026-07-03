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
    beginner: "text-[hsl(var(--success))] bg-[hsl(var(--success))]/10 border-[hsl(var(--success))]/20",
    intermediate: "text-[hsl(var(--warning))] bg-[hsl(var(--warning))]/12 border-[hsl(var(--warning))]/20",
    advanced: "text-[hsl(var(--destructive))] bg-[hsl(var(--destructive))]/10 border-[hsl(var(--destructive))]/20",
  };
  return map[difficulty] ?? "";
}

export function getServiceColor(service: string): string {
  const colorMap: Record<string, string> = {
    IAM: "bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))]",
    S3: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
    EC2: "bg-[hsl(var(--info))]/10 text-[hsl(var(--info))]",
    VPC: "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
    RDS: "bg-[hsl(var(--info))]/10 text-[hsl(var(--info))]",
    DynamoDB: "bg-[hsl(var(--info))]/10 text-[hsl(var(--info))]",
    ElastiCache: "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
    ALB: "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
    Lambda: "bg-[hsl(var(--warning))]/12 text-[hsl(var(--warning))]",
    "API Gateway": "bg-[hsl(var(--info))]/10 text-[hsl(var(--info))]",
    CloudWatch: "bg-[hsl(var(--warning))]/12 text-[hsl(var(--warning))]",
    CloudFront: "bg-[hsl(var(--info))]/10 text-[hsl(var(--info))]",
    ECS: "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
    Fargate: "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
  };
  return colorMap[service] ?? "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]";
}

export function calculateProgress(completedCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return Math.round((completedCount / totalCount) * 100);
}
