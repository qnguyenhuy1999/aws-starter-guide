import { stages } from "@/content/stages";
import { RoadmapCard } from "@/components/guide/roadmap-card";
import type { Stage } from "@/types/guide";

type Difficulty = "beginner" | "intermediate" | "advanced";

const DIFFICULTY_ORDER: Difficulty[] = ["beginner", "intermediate", "advanced"];

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: "Người mới bắt đầu",
  intermediate: "Trung cấp",
  advanced: "Nâng cao",
};

const DIFFICULTY_META: Record<Difficulty, { badge: string; description: string }> = {
  beginner: {
    badge: "Beginner",
    description: "Nền tảng AWS — tài khoản, IAM, mạng và máy chủ đầu tiên của bạn.",
  },
  intermediate: {
    badge: "Intermediate",
    description: "Triển khai ứng dụng thực tế, cơ sở dữ liệu và kiến trúc có khả năng mở rộng.",
  },
  advanced: {
    badge: "Advanced",
    description: "Tối ưu hoá chi phí, bảo mật chuyên sâu, serverless và CI/CD production.",
  },
};

function groupByDifficulty(list: Stage[]): Record<Difficulty, Stage[]> {
  const groups: Record<Difficulty, Stage[]> = {
    beginner: [],
    intermediate: [],
    advanced: [],
  };
  for (const stage of list) {
    const key = stage.difficulty as Difficulty;
    if (key in groups) {
      groups[key].push(stage);
    }
  }
  return groups;
}

export const metadata = {
  title: "Tất cả giai đoạn | AWS Starter Guide",
  description: "Khám phá toàn bộ lộ trình học AWS theo từng cấp độ.",
};

export default function StagesPage() {
  const grouped = groupByDifficulty(stages);

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page header */}
        <header className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))] mb-2">
            Lộ trình học
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl">
            Tất cả giai đoạn
          </h1>
          <p className="mt-3 text-base text-[hsl(var(--muted-foreground))] max-w-xl">
            {stages.length} giai đoạn được sắp xếp theo cấp độ — từ thiết lập ban đầu đến kiến trúc
            production-ready trên AWS.
          </p>
        </header>

        {/* Difficulty groups */}
        <div className="space-y-14">
          {DIFFICULTY_ORDER.map((difficulty) => {
            const group = grouped[difficulty];
            if (group.length === 0) return null;
            const meta = DIFFICULTY_META[difficulty];

            return (
              <section key={difficulty}>
                <div className="flex items-baseline gap-3 mb-1">
                  <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                    {DIFFICULTY_LABELS[difficulty]}
                  </h2>
                  <span className="text-sm text-[hsl(var(--muted-foreground))]">
                    {group.length} giai đoạn
                  </span>
                </div>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-5">
                  {meta.description}
                </p>
                <div className="h-px bg-[hsl(var(--border))] mb-6" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.map((stage) => (
                    <RoadmapCard key={stage.id} stage={stage} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
