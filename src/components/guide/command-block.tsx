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
    <div className={cn("rounded-md overflow-hidden text-sm font-mono", className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between bg-zinc-800 px-3 py-2">
        <div className="flex items-center gap-2">
          {/* Terminal dots */}
          <span className="h-3 w-3 rounded-full bg-red-500 opacity-80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400 opacity-80" />
          <span className="h-3 w-3 rounded-full bg-green-500 opacity-80" />
          <span className="ml-2 text-xs text-zinc-400 tracking-wide select-none">
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
              ? "text-green-400"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700"
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
      <div className="bg-zinc-900 px-4 py-3 space-y-1">
        {lines.map((line, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="select-none text-green-400 shrink-0">$</span>
            <span className="text-zinc-100 whitespace-pre-wrap break-all">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
