"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandBlockProps {
  command?: string;
  commands?: string[];
  className?: string;
}

export function CommandBlock({ command, commands, className }: CommandBlockProps) {
  const [copied, setCopied] = useState(false);

  const lines: string[] = commands ?? (command ? [command] : []);

  const handleCopy = async () => {
    if (lines.length === 0) return;
    await navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (lines.length === 0) return null;

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-[hsl(var(--border))] text-sm font-mono", className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 px-3 py-2">
        <div className="flex items-center gap-2">
          {/* Terminal dots */}
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--destructive))] opacity-80" />
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--warning))] opacity-80" />
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--success))] opacity-80" />
          <span className="ml-2 select-none text-xs tracking-wide text-[hsl(var(--muted-foreground))]">
            Terminal
          </span>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          aria-label={copied ? "Đã sao chép" : "Sao chép lệnh"}
          className={cn(
            "flex items-center gap-1.5 rounded px-2 py-1 text-xs transition-colors",
            copied
              ? "text-[hsl(var(--success))]"
              : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]"
          )}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Đã sao chép!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Command lines */}
      <div className="space-y-1 bg-[hsl(var(--background))] px-4 py-3">
        {lines.map((line, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="shrink-0 select-none text-[hsl(var(--success))]">$</span>
            <span className="whitespace-pre-wrap break-all text-[hsl(var(--foreground))]">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
