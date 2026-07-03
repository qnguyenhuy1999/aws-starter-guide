"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center px-6 py-16 gap-4",
        className
      )}
    >
      {icon && (
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      )}

      <div className="flex flex-col items-center gap-1.5 max-w-xs">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="mt-2">
          {action.href ? (
            <Link href={action.href}>
              <Button variant="default" size="sm">
                {action.label}
              </Button>
            </Link>
          ) : (
            <Button variant="default" size="sm" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
