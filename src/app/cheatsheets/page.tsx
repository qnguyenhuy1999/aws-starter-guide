"use client";

import { useMemo, useState } from "react";
import { FileCode2, Layers3 } from "lucide-react";
import { cheatsheets } from "@/content/cheatsheets";
import { CodeBlock } from "@/components/guide/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ALL_SERVICES = Array.from(new Set(cheatsheets.map((s) => s.service))).sort();

export default function CheatsheetsPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      selectedService
        ? cheatsheets.filter((section) => section.service === selectedService)
        : cheatsheets,
    [selectedService]
  );

  const totalCommands = filtered.reduce((acc, section) => acc + section.items.length, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(var(--card))] via-[hsl(var(--background))] to-[hsl(var(--muted))]/35 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--primary))]">
            Cheat Sheets
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 px-3 py-1 text-xs text-muted-foreground">
            <FileCode2 className="h-3.5 w-3.5" aria-hidden="true" />
            {totalCommands} snippets
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 px-3 py-1 text-xs text-muted-foreground">
            <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
            {filtered.length} sections
          </span>
        </div>

        <div className="mt-5 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tài liệu lệnh và mẫu cấu hình
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            CLI commands, policy snippets và cấu hình thực hành được nhóm theo dịch vụ để bạn tra cứu nhanh khi học hoặc làm việc.
          </p>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant={selectedService === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedService(null)}
        >
          All services
        </Button>
        {ALL_SERVICES.map((service) => {
          const active = selectedService === service;
          return (
            <Button
              key={service}
              type="button"
              variant={active ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedService(active ? null : service)}
            >
              {service}
            </Button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))] py-16 text-center text-sm text-muted-foreground">
          Không tìm thấy cheat sheet phù hợp.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {filtered.map((section) => (
            <Card key={section.id} className="overflow-hidden border-[hsl(var(--border))]/80">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[hsl(var(--border))] px-5 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {section.service}
                  </Badge>
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    {section.title}
                  </h2>
                </div>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {section.items.length} snippet{section.items.length !== 1 ? "s" : ""}
                </span>
              </div>

              <CardContent className="space-y-4 p-5">
                {section.items.map((item, index) => (
                  <div
                    key={`${section.id}-${index}`}
                    className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20 p-4"
                  >
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                    <CodeBlock
                      code={item.command}
                      language={item.language}
                      className="mt-3"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
