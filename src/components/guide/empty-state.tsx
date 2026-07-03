"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card
      className={cn(
        "border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))]/80",
        className
      )}
    >
      <CardContent className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        {icon && (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
            {icon}
          </div>
        )}

        <div className="flex max-w-xs flex-col items-center gap-1.5">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
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
      </CardContent>
    </Card>
  );
}
