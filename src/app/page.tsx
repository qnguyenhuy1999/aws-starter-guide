import Link from "next/link";
import { stages } from "@/content/stages";
import { getTotalStats } from "@/lib/stage-utils";
import { RoadmapCard } from "@/components/guide/roadmap-card";
import { ContinueLearning } from "./continue-learning";

export default function Home() {
  const stats = getTotalStats();
  const firstSixStages = stages.slice(0, 6);

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 to-transparent px-4 pt-14 pb-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            AWS Starter Guide
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Lộ trình học AWS từ con số 0
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Dành cho Fullstack &amp; Backend Developer. Học qua labs thực hành,
            checklist từng bước, kiến trúc thực tế — không lý thuyết suông.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/stages/0-foundation"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Bắt đầu học
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Xem Roadmap
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-3xl px-4 flex flex-col gap-16">
        {/* Stats bar */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: `${stats.totalStages}`, label: "Giai đoạn" },
            { value: "40+", label: "Labs thực hành" },
            { value: "200+", label: "Checklist items" },
            { value: "~16", label: "Tuần hoàn thành" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card px-4 py-4 text-center"
            >
              <p className="text-2xl font-bold tabular-nums text-primary">{value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Continue learning banner (client) */}
        <ContinueLearning />

        {/* Stage grid */}
        <section>
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Lộ trình
          </h2>
          <p className="mb-6 text-xl font-bold text-foreground">
            Khám phá các giai đoạn
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {firstSixStages.map((stage) => (
              <RoadmapCard key={stage.id} stage={stage} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Xem tất cả {stats.totalStages} giai đoạn
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* Learning outcomes */}
        <section>
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Kết quả
          </h2>
          <p className="mb-6 text-xl font-bold text-foreground">
            Bạn sẽ học được gì?
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Triển khai ứng dụng production-ready trên AWS",
              "Thiết kế kiến trúc serverless, container, và microservices",
              "Bảo mật hạ tầng với IAM, VPC, và Security Groups",
              "Tự động hóa CI/CD pipeline với CodePipeline và GitHub Actions",
              "Tối ưu chi phí và giám sát với CloudWatch",
              "Chuẩn bị cho chứng chỉ AWS Solutions Architect",
            ].map((outcome) => (
              <li key={outcome} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--primary))]" />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed text-foreground">{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Audience */}
        <section>
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Đối tượng
          </h2>
          <p className="mb-6 text-xl font-bold text-foreground">
            Phù hợp với ai?
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Fullstack Developer",
                description:
                  "Biết code web nhưng chưa từng deploy lên cloud. Muốn tự chủ hạ tầng từ A đến Z.",
                icon: "⬡",
              },
              {
                title: "Backend Developer",
                description:
                  "Viết API hàng ngày nhưng chưa hiểu S3, RDS, hay Lambda. Muốn scale ứng dụng thực sự.",
                icon: "⬡",
              },
              {
                title: "DevOps beginner",
                description:
                  "Đã biết Linux cơ bản, muốn học CI/CD, containers, và infrastructure as code.",
                icon: "⬡",
              },
            ].map(({ title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card px-5 py-5 flex flex-col gap-3"
              >
                <p className="font-semibold text-foreground">{title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
