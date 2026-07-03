import { notFound } from "next/navigation";
import { getStageBySlug, getPrevStage, getNextStage, getAllStageSlugs } from "@/lib/stage-utils";
import StageContentLayout from "@/components/guide/stage-content-layout";
import { TableOfContents } from "@/components/guide/table-of-contents";
import { StageHeader } from "@/components/guide/stage-header";
import { Checklist } from "@/components/guide/checklist";
import { Quiz } from "@/components/guide/quiz";
import { PrevNextNavigation } from "@/components/guide/prev-next-navigation";
import { ArchitectureDiagram } from "@/components/guide/architecture-diagram";
import { ScreenshotStep } from "@/components/guide/screenshot-step";
import { CodeBlock } from "@/components/guide/code-block";
import { Callout } from "@/components/guide/callout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { StageTracker } from "./stage-tracker";

export function generateStaticParams() {
  return getAllStageSlugs().map((slug) => ({ slug }));
}

const TOC_SECTIONS = [
  { id: "kien-thuc", label: "Kiến thức" },
  { id: "architecture", label: "Kiến trúc" },
  { id: "aws-console", label: "Thực hành" },
  { id: "lab", label: "Lab" },
  { id: "best-practices", label: "Best Practices" },
  { id: "checklist", label: "Checklist" },
  { id: "quiz", label: "Quiz" },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function StagePage({ params }: PageProps) {
  const { slug } = await params;
  const stage = getStageBySlug(slug);
  if (!stage) notFound();

  const bashSnippets = stage.codeSnippets.filter((s) => s.language === "bash");
  const codeSnippets = stage.codeSnippets.filter((s) => s.language !== "bash");

  const doItems = stage.bestPractices.filter(
    (bp) => !bp.startsWith("Không") && !bp.startsWith("Đừng")
  );
  const dontItems = stage.bestPractices.filter(
    (bp) => bp.startsWith("Không") || bp.startsWith("Đừng")
  );

  return (
    <>
      <StageTracker slug={slug} />
      <StageContentLayout toc={<TableOfContents sections={TOC_SECTIONS} />}>
        <StageHeader stage={stage} />

        {/* Concepts */}
        <section id="kien-thuc" className="mt-10">
          <h2 className="text-xl font-bold mb-4">Kiến thức cốt lõi</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {stage.concepts.map((concept) => (
              <Card key={concept.title} className="p-4">
                <h3 className="font-semibold mb-1">{concept.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{concept.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="mt-10">
          <h2 className="text-xl font-bold mb-4">Kiến trúc</h2>
          <ArchitectureDiagram
            title={stage.architecture.title}
            description={stage.architecture.description}
            nodes={stage.architecture.nodes}
            connections={stage.architecture.connections}
          />
        </section>

        {/* Console / CLI / Code tabs */}
        <section id="aws-console" className="mt-10">
          <h2 className="text-xl font-bold mb-4">Thực hành</h2>
          <Tabs defaultValue="console">
            <TabsList>
              <TabsTrigger value="console">AWS Console</TabsTrigger>
              <TabsTrigger value="cli">CLI</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            <TabsContent value="console" className="mt-4">
              {stage.consoleSteps.map((step, idx) => (
                <ScreenshotStep
                  key={step.imagePath}
                  step={idx + 1}
                  title={step.title}
                  description={step.description}
                  imagePath={step.imagePath}
                  alt={step.alt}
                />
              ))}
            </TabsContent>

            <TabsContent value="cli" className="mt-4">
              {bashSnippets.map((snippet) => (
                <CodeBlock
                  key={snippet.title ?? snippet.code.slice(0, 40)}
                  code={snippet.code}
                  language={snippet.language}
                  title={snippet.title}
                />
              ))}
            </TabsContent>

            <TabsContent value="code" className="mt-4">
              {codeSnippets.map((snippet) => (
                <CodeBlock
                  key={snippet.title ?? snippet.code.slice(0, 40)}
                  code={snippet.code}
                  language={snippet.language}
                  title={snippet.title}
                />
              ))}
            </TabsContent>
          </Tabs>
        </section>

        {/* Labs */}
        <section id="lab" className="mt-10">
          <h2 className="text-xl font-bold mb-4">Lab thực hành</h2>
          {stage.labs.map((lab) => (
            <div key={lab.id} className="mb-8 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
              <h3 className="font-bold text-lg mb-1">{lab.title}</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">{lab.objective}</p>
              <ol className="list-decimal list-inside space-y-2 mb-4">
                {lab.steps.map((step, idx) => (
                  <li key={idx} className="text-sm">{step}</li>
                ))}
              </ol>
              <Callout type="tip" title="Kết quả mong đợi">
                {lab.expectedResult}
              </Callout>
              {lab.troubleshooting.length > 0 && (
                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value="troubleshooting">
                    <AccordionTrigger className="text-sm font-medium">Xử lý sự cố</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-1">
                        {lab.troubleshooting.map((item, idx) => (
                          <li key={idx} className="text-sm text-[hsl(var(--muted-foreground))]">{item}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          ))}
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="mt-10">
          <h2 className="text-xl font-bold mb-4">Best Practices</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Badge variant="secondary" className="mb-3">Nên làm</Badge>
              <ul className="space-y-2">
                {doItems.map((item, idx) => (
                  <li key={idx} className="flex gap-2 text-sm">
                    <span className="text-[hsl(var(--success))] shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Badge variant="outline" className="mb-3 text-[hsl(var(--destructive))] border-[hsl(var(--destructive))]/20">Không nên</Badge>
              <ul className="space-y-2">
                {dontItems.map((item, idx) => (
                  <li key={idx} className="flex gap-2 text-sm">
                    <span className="text-[hsl(var(--destructive))] shrink-0">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section id="checklist" className="mt-10">
          <h2 className="text-xl font-bold mb-4">Checklist</h2>
          <Checklist items={stage.checklist} stageSlug={stage.slug} />
        </section>

        {/* Quiz */}
        <section id="quiz" className="mt-10">
          <h2 className="text-xl font-bold mb-4">Quiz</h2>
          <Quiz questions={stage.quiz} stageSlug={stage.slug} />
        </section>

        <PrevNextNavigation
          prev={getPrevStage(stage.id)}
          next={getNextStage(stage.id)}
        />
      </StageContentLayout>
    </>
  );
}
