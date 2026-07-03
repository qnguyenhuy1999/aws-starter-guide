"use client";

import { useState, useMemo } from "react";
import { glossaryTerms } from "@/content/glossary";
import GlossaryTermCard from "@/components/guide/glossary-term-card";
import { Input } from "@/components/ui/input";

export default function GlossaryPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return glossaryTerms;
    return glossaryTerms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, typeof filtered>>((acc, term) => {
      const cat = term.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(term);
      return acc;
    }, {});
  }, [filtered]);

  const categoryOrder = [
    "Core",
    "Compute",
    "Storage",
    "Networking",
    "Database",
    "Security",
    "Messaging",
    "Monitoring",
    "IaC",
  ];

  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    const ai = categoryOrder.indexOf(a);
    const bi = categoryOrder.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Tài liệu tham khảo
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Bảng Thuật Ngữ
          </h1>
          <p className="mt-2 text-muted-foreground text-sm max-w-xl">
            Tra cứu các khái niệm AWS thường gặp — từ hạ tầng cơ bản đến bảo
            mật và serverless.
          </p>
        </div>
      </div>

      {/* Search + stats bar */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <Input
              type="search"
              placeholder="Tìm thuật ngữ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <span className="text-sm text-muted-foreground tabular-nums shrink-0">
            {filtered.length}{" "}
            <span className="hidden sm:inline">thuật ngữ</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {sortedCategories.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground text-sm">
            Không tìm thấy thuật ngữ nào phù hợp.
          </div>
        ) : (
          sortedCategories.map((category) => (
            <section key={category} id={`category-${category.toLowerCase()}`}>
              {/* Section heading */}
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {category}
                </h2>
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs tabular-nums text-muted-foreground">
                  {grouped[category].length}
                </span>
              </div>

              {/* Term grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {grouped[category].map((term) => (
                  <div key={term.id} id={term.id}>
                    <GlossaryTermCard term={term} />
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
