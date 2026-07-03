"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  backHref?: string;
}

export function ErrorState({ message, onRetry, backHref }: ErrorStateProps) {
  return (
    <Card className="mx-auto max-w-md border-[hsl(var(--destructive))]/20 bg-[hsl(var(--card))]">
      <CardContent className="flex flex-col items-center justify-center gap-4 px-6 py-10 text-center">
        <AlertCircle className="h-12 w-12 text-[hsl(var(--destructive))]" />
        <h2 className="text-xl font-semibold text-foreground">Đã có lỗi xảy ra</h2>
        {message && (
          <p className="max-w-md text-sm text-muted-foreground">{message}</p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          {onRetry && (
            <Button variant="default" onClick={onRetry}>
              Thử lại
            </Button>
          )}
          {backHref && (
            <Link href={backHref} className={buttonVariants({ variant: "outline" })}>Quay lại</Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
