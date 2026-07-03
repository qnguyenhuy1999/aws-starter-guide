"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, BookOpen, FlaskConical, BookMarked } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { search, type SearchResult } from "@/lib/search";
import { cn } from "@/lib/utils";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TYPE_ICONS = {
  stage: BookOpen,
  lab: FlaskConical,
  glossary: BookMarked,
  cheatsheet: Search,
};

const TYPE_LABELS: Record<SearchResult["type"], string> = {
  stage: "Giai đoạn",
  lab: "Lab",
  glossary: "Từ điển",
  cheatsheet: "Cheat Sheet",
};

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();

  const results = useMemo(() => query.length >= 2 ? search(query) : [], [query]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === "/" || (e.metaKey && e.key === "k")) && !open) {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      onOpenChange(false);
      setQuery("");
    },
    [router, onOpenChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      navigate(results[selected].href);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-xl">
        <div className="flex items-center gap-3 border-b border-[hsl(var(--border))] px-4 py-3">
          <Search className="h-4 w-4 text-[hsl(var(--muted-foreground))] shrink-0" />
          <Input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Tìm kiếm giai đoạn, lab, từ điển..."
            className="border-0 p-0 focus-visible:ring-0 text-base"
            autoFocus
          />
        </div>

        {results.length > 0 && (
          <ul className="max-h-96 overflow-y-auto py-2">
            {results.map((result, index) => {
              const Icon = TYPE_ICONS[result.type];
              return (
                <li key={result.id}>
                  <button
                    onClick={() => navigate(result.href)}
                    className={cn(
                      "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors",
                      selected === index
                        ? "bg-[hsl(var(--accent))]"
                        : "hover:bg-[hsl(var(--accent))]"
                    )}
                  >
                    <Icon className="h-4 w-4 mt-0.5 text-[hsl(var(--muted-foreground))] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{result.title}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">{result.description}</p>
                    </div>
                    <span className="text-xs text-[hsl(var(--muted-foreground))] shrink-0 mt-0.5">
                      {TYPE_LABELS[result.type]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="py-12 text-center text-sm text-[hsl(var(--muted-foreground))]">
            Không tìm thấy kết quả cho &quot;{query}&quot;
          </div>
        )}

        {query.length === 0 && (
          <div className="py-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
            Nhập từ khóa để tìm kiếm...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
