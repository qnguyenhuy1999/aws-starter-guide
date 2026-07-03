"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { sidebarNav } from "@/content/navigation";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

function getIcon(name: string | undefined): LucideIcon | null {
  if (!name) return null;
  return (Icons as unknown as Record<string, LucideIcon>)[name] ?? null;
}

export function Sidebar() {
  const pathname = usePathname();
  const [stagesOpen, setStagesOpen] = useState(true);

  return (
    <nav className="p-4 space-y-1">
      {sidebarNav.map((item) => {
        const Icon = getIcon(item.icon);
        const isActive = pathname === item.href;
        const hasChildren = item.children && item.children.length > 0;
        const isStages = item.href === "/stages";

        if (hasChildren) {
          return (
            <div key={item.href}>
              <button
                onClick={() => setStagesOpen(!stagesOpen)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]"
                )}
              >
                {Icon && <Icon className="h-4 w-4 shrink-0" />}
                <span className="flex-1 text-left">{item.title}</span>
                {isStages ? (
                  stagesOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />
                ) : null}
              </button>
              {stagesOpen && (
                <div className="mt-1 ml-3 pl-4 border-l border-[hsl(var(--border))] space-y-0.5">
                  {item.children!.map((child) => {
                    const childActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-3 py-1.5 rounded-md text-xs transition-colors",
                          childActive
                            ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] font-medium"
                            : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]"
                        )}
                      >
                        {child.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]"
            )}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
