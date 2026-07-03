import Link from "next/link";
import type { ElementType } from "react";
import { ArrowRight, BookOpen, CheckCircle2, CircleDashed, ListChecks } from "lucide-react";
import { stages } from "@/content/stages";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Quiz kiểm tra kiến thức | AWS Starter Guide",
};

function StatCard({
  value,
  label,
  icon: Icon,
}: {
  value: number;
  label: string;
  icon: ElementType;
}) {
  return (
    <Card className="border-[hsl(var(--border))]/80 bg-[hsl(var(--card))]/80">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-bold tabular-nums leading-none text-foreground">{value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function QuizPage() {
  const totalQuestions = stages.reduce((acc, s) => acc + s.quiz.length, 0);
  const stagesWithQuiz = stages.filter((s) => s.quiz.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(var(--primary))]/8 via-[hsl(var(--card))] to-[hsl(var(--muted))]/40 p-6 sm:p-8">
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--primary))]">
              Kiểm tra kiến thức
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 px-3 py-1 text-xs text-muted-foreground">
              <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
              {stagesWithQuiz.length} giai đoạn có quiz
            </span>
          </div>

          <div className="mt-5 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Quiz kiểm tra kiến thức AWS
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              Ôn luyện từng giai đoạn học AWS. Chọn một stage để mở quiz ngay tại bài học tương ứng và theo dõi tiến độ của bạn.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <StatCard value={totalQuestions} label="Tổng câu hỏi" icon={BookOpen} />
            <StatCard value={stagesWithQuiz.length} label="Stages có quiz" icon={CheckCircle2} />
            <StatCard value={stages.length} label="Tổng stages" icon={CircleDashed} />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Chọn stage
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">
              Bắt đầu một bài quiz
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Mỗi stage dẫn bạn đến quiz gắn với nội dung bài học.
          </p>
        </div>

        {stagesWithQuiz.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))] p-10 text-center text-sm text-muted-foreground">
            Chưa có quiz nào được cấu hình.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stagesWithQuiz.map((stage, index) => (
              <Link
                key={stage.id}
                href={`/stages/${stage.slug}#quiz`}
                className="group block"
              >
                <article className="flex h-full flex-col rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[hsl(var(--primary))]/25 hover:shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10 text-sm font-bold tabular-nums text-[hsl(var(--primary))]">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                          Stage {stage.id}
                        </p>
                        <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-[hsl(var(--primary))]">
                          {stage.title}
                        </h3>
                      </div>
                    </div>
                    <span className="inline-flex shrink-0 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 px-2.5 py-1 text-xs tabular-nums text-muted-foreground">
                      {stage.quiz.length} câu
                    </span>
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {stage.subtitle}
                  </p>

                  <div className="mt-auto pt-5">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--primary))]">
                      Làm quiz
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
