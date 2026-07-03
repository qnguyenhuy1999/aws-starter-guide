"use client";

import { useState } from "react";
import { cheatsheets } from "@/content/cheatsheets";
import { CodeBlock } from "@/components/guide/code-block";

const ALL_SERVICES = Array.from(new Set(cheatsheets.map((s) => s.service))).sort();

const SERVICE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  S3:          { bg: "bg-[#1a2a1a]", text: "text-[#4ade80]", dot: "bg-[#4ade80]" },
  EC2:         { bg: "bg-[#1a2020]", text: "text-[#22d3ee]", dot: "bg-[#22d3ee]" },
  IAM:         { bg: "bg-[#2a1a1a]", text: "text-[#f87171]", dot: "bg-[#f87171]" },
  Lambda:      { bg: "bg-[#1e1a2a]", text: "text-[#a78bfa]", dot: "bg-[#a78bfa]" },
  CloudWatch:  { bg: "bg-[#2a221a]", text: "text-[#fb923c]", dot: "bg-[#fb923c]" },
  Terraform:   { bg: "bg-[#1a1e2a]", text: "text-[#60a5fa]", dot: "bg-[#60a5fa]" },
};

function getServiceStyle(service: string) {
  return SERVICE_COLORS[service] ?? { bg: "bg-[#1e2030]", text: "text-[#94a3b8]", dot: "bg-[#94a3b8]" };
}

export default function CheatsheetsPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const filtered = selectedService
    ? cheatsheets.filter((s) => s.service === selectedService)
    : cheatsheets;

  const totalCommands = filtered.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#e2e8f0]">
      {/* Top bar */}
      <header className="border-b border-[#1e2a3a] bg-[#0d1221]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono tracking-widest text-[#FF9900] uppercase">
                AWS Starter Guide
              </span>
              <span className="text-[#2a3a4a]">/</span>
              <span className="text-xs font-mono tracking-widest text-[#4a6080] uppercase">
                Reference
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Cheat Sheets
            </h1>
            <p className="text-sm text-[#5a7090] mt-1">
              CLI commands, config templates, and policy examples — ready to copy.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-[#4a6080] mt-1">
            <span className="tabular-nums">
              <span className="text-[#FF9900] font-semibold">{totalCommands}</span> snippets
            </span>
            <span className="text-[#1e2a3a]">|</span>
            <span className="tabular-nums">
              <span className="text-[#FF9900] font-semibold">{filtered.length}</span> sections
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8 items-start">

          {/* Sidebar filter */}
          <aside className="hidden lg:block w-48 flex-shrink-0 sticky top-8">
            <p className="text-[10px] font-mono tracking-widest text-[#3a5070] uppercase mb-3">
              Filter by service
            </p>
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => setSelectedService(null)}
                className={[
                  "w-full text-left px-3 py-2 rounded-lg text-sm font-mono transition-colors",
                  selectedService === null
                    ? "bg-[#FF9900] text-[#0a0e1a] font-semibold"
                    : "text-[#5a7090] hover:text-[#e2e8f0] hover:bg-[#141b28]",
                ].join(" ")}
              >
                All services
              </button>
              {ALL_SERVICES.map((service) => {
                const style = getServiceStyle(service);
                const active = selectedService === service;
                return (
                  <button
                    key={service}
                    onClick={() => setSelectedService(active ? null : service)}
                    className={[
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-mono transition-colors flex items-center gap-2",
                      active
                        ? `${style.bg} ${style.text} font-semibold`
                        : "text-[#5a7090] hover:text-[#e2e8f0] hover:bg-[#141b28]",
                    ].join(" ")}
                  >
                    <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? style.dot : "bg-[#2a3a4a]"}`} />
                    {service}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Mobile pill strip */}
          <div className="lg:hidden w-full mb-6 -mx-0">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedService(null)}
                className={[
                  "px-3 py-1.5 rounded-full text-xs font-mono transition-colors",
                  selectedService === null
                    ? "bg-[#FF9900] text-[#0a0e1a] font-semibold"
                    : "bg-[#141b28] text-[#5a7090] hover:text-[#e2e8f0]",
                ].join(" ")}
              >
                All
              </button>
              {ALL_SERVICES.map((service) => {
                const active = selectedService === service;
                const style = getServiceStyle(service);
                return (
                  <button
                    key={service}
                    onClick={() => setSelectedService(active ? null : service)}
                    className={[
                      "px-3 py-1.5 rounded-full text-xs font-mono transition-colors flex items-center gap-1.5",
                      active
                        ? `${style.bg} ${style.text} font-semibold`
                        : "bg-[#141b28] text-[#5a7090] hover:text-[#e2e8f0]",
                    ].join(" ")}
                  >
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${active ? style.dot : "bg-[#2a3a4a]"}`} />
                    {service}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-[#3a5070] font-mono text-sm">
                No sections found.
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {filtered.map((section) => {
                  const style = getServiceStyle(section.service);
                  return (
                    <section
                      key={section.id}
                      className="rounded-xl border border-[#1e2a3a] bg-[#0d1221] overflow-hidden"
                    >
                      {/* Section header */}
                      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2436]">
                        <div className="flex items-center gap-3">
                          <span
                            className={[
                              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold",
                              style.bg,
                              style.text,
                            ].join(" ")}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                            {section.service}
                          </span>
                          <h2 className="text-sm font-semibold text-[#c8d8e8] tracking-tight">
                            {section.title}
                          </h2>
                        </div>
                        <span className="text-xs font-mono text-[#2a4060] tabular-nums">
                          {section.items.length} snippet{section.items.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-[#111927]">
                        {section.items.map((item, i) => (
                          <div key={i} className="px-5 pt-4 pb-1">
                            <p className="text-xs text-[#4a6a8a] font-mono mb-0 leading-snug">
                              {item.description}
                            </p>
                            <CodeBlock
                              code={item.command}
                              language={item.language}
                              className="mt-1 mb-3 !rounded-lg !border-[#1a2a3a]"
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
