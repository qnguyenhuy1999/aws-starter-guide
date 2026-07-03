"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export function CodeBlock({ code, language = "bash", title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] my-4", className)}>
      <div className="flex items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--destructive))]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--warning))]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--success))]" />
          </div>
          {title && <span className="ml-2 text-xs text-[hsl(var(--muted-foreground))]">{title}</span>}
          {!title && <span className="ml-2 text-xs text-[hsl(var(--muted-foreground))]">{language}</span>}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[hsl(var(--success))]" />
              <span className="text-[hsl(var(--success))]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto bg-[hsl(var(--background))] p-4 text-sm leading-relaxed text-[hsl(var(--foreground))]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
