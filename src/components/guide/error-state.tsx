"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  backHref?: string;
}

export function ErrorState({ message, onRetry, backHref }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <h2 className="text-xl font-semibold text-foreground">Đã có lỗi xảy ra</h2>
      {message && (
        <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      )}
      <div className="flex gap-3">
        {onRetry && (
          <Button variant="default" onClick={onRetry}>
            Thử lại
          </Button>
        )}
        {backHref && (
          <Link href={backHref} className={buttonVariants({ variant: "outline" })}>Quay lại</Link>
        )}
      </div>
    </div>
  );
}
