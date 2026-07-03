"use client";

import { useState } from "react";
import { Monitor, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGuidePlaceholderProps {
  title: string;
  description: string;
  imagePath: string;
  alt: string;
  step?: number;
  className?: string;
}

export function ImageGuidePlaceholder({
  title,
  description,
  imagePath,
  alt,
  step,
  className,
}: ImageGuidePlaceholderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(imagePath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-dashed border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 my-4",
        className
      )}
      role="img"
      aria-label={alt}
    >
      <div className="flex flex-col items-center justify-center p-8 text-center gap-3">
        <div className="h-16 w-16 rounded-2xl bg-[hsl(var(--muted))] flex items-center justify-center">
          <Monitor className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
        </div>
        {step !== undefined && (
          <span className="text-xs font-medium bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] px-2 py-0.5 rounded-full">
            Bước {step}
          </span>
        )}
        <div>
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 max-w-xs">{description}</p>
        </div>
        <div className="flex items-center gap-2 bg-[hsl(var(--muted))] rounded-lg px-3 py-2 mt-2">
          <code className="text-xs text-[hsl(var(--muted-foreground))] font-mono">{imagePath}</code>
          <button
            onClick={handleCopy}
            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors ml-1"
            aria-label="Copy image path"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[hsl(var(--success))]" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          AWS Console Screenshot — Thêm ảnh thật tại đường dẫn trên
        </p>
      </div>
    </div>
  );
}
