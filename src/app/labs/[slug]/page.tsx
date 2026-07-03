import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, ListChecks, AlertCircle } from "lucide-react";
import { stages } from "@/content/stages";
import { Callout } from "@/components/guide/callout";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return stages.flatMap((s) =>
    s.labs.map((l) => ({ slug: l.slug }))
  );
}

export default async function LabDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const allLabs = stages.flatMap((s) => s.labs);
  const lab = allLabs.find((l) => l.slug === slug);
  if (!lab) notFound();

  const stage = stages.find((s) => s.id === lab.stageId);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] mb-8 flex-wrap"
      >
        <Link
          href="/stages"
          className="hover:text-[hsl(var(--foreground))] transition-colors"
        >
          Giai đoạn
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        {stage ? (
          <>
            <Link
              href={`/stages/${stage.slug}`}
              className="hover:text-[hsl(var(--foreground))] transition-colors"
            >
              {stage.title}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          </>
        ) : null}
        <span className="text-[hsl(var(--foreground))] font-medium truncate">
          {lab.title}
        </span>
      </nav>

      {/* Title */}
      <h1 className="text-2xl font-bold tracking-tight leading-snug mb-4">
        {lab.title}
      </h1>

      {/* Objective */}
      <Callout type="info" title="Mục tiêu">
        {lab.objective}
      </Callout>

      {/* Meta row */}
      <div className="flex items-center gap-5 text-sm text-[hsl(var(--muted-foreground))] mt-6 mb-8">
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 shrink-0" />
          {lab.estimatedTime}
        </span>
        <span className="flex items-center gap-1.5">
          <ListChecks className="h-4 w-4 shrink-0" />
          {lab.steps.length} bước
        </span>
      </div>

      {/* Steps */}
      <section aria-labelledby="steps-heading" className="mb-10">
        <h2
          id="steps-heading"
          className="text-base font-semibold tracking-tight mb-4"
        >
          Các bước thực hiện
        </h2>
        <ol className="flex flex-col gap-4 list-none">
          {lab.steps.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-xs font-semibold mt-0.5 tabular-nums"
              >
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-[hsl(var(--foreground))] pt-0.5">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Expected result */}
      <section aria-labelledby="result-heading" className="mb-10">
        <h2
          id="result-heading"
          className="text-base font-semibold tracking-tight mb-3"
        >
          Kết quả mong đợi
        </h2>
        <Callout type="tip" title="Kết quả mong đợi">
          {lab.expectedResult}
        </Callout>
      </section>

      {/* Troubleshooting */}
      {lab.troubleshooting.length > 0 && (
        <section aria-labelledby="troubleshooting-heading">
          <h2
            id="troubleshooting-heading"
            className="text-base font-semibold tracking-tight mb-3 flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4 text-[hsl(var(--warning))] shrink-0" />
            Xử lý sự cố
          </h2>
          <Accordion type="multiple" className="border rounded-xl overflow-hidden">
            {lab.troubleshooting.map((tip, index) => (
              <AccordionItem
                key={index}
                value={`tip-${index}`}
                className="px-4 last:border-b-0"
              >
                <AccordionTrigger className="text-sm font-medium text-left">
                  Vấn đề {index + 1}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {tip}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {/* Back link */}
      <div className="mt-10 pt-6 border-t border-[hsl(var(--border))]">
        <Link
          href="/labs"
          className="text-sm text-[hsl(var(--primary))] hover:underline flex items-center gap-1"
        >
          <ChevronRight className="h-3.5 w-3.5 rotate-180" />
          Quay lại danh sách Labs
        </Link>
      </div>
    </div>
  );
}
