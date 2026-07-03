"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore, useState } from "react";
import { resetAllProgress } from "@/lib/progress-storage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Sun, Moon, Monitor, Trash2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ThemeOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden">
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <h2 className="text-sm font-semibold text-[hsl(var(--foreground))]">
          {title}
        </h2>
        {description && (
          <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">
            {description}
          </p>
        )}
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  const options: ThemeOption[] = [
    { value: "light", label: "Sáng", icon: <Sun className="h-4 w-4" /> },
    { value: "dark", label: "Tối", icon: <Moon className="h-4 w-4" /> },
    { value: "system", label: "Hệ thống", icon: <Monitor className="h-4 w-4" /> },
  ];

  return (
    <div className="flex gap-2">
      {options.map((opt) => {
        const isActive = mounted && theme === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
              isActive
                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                : "border-[hsl(var(--border))] bg-transparent text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
            )}
            aria-pressed={isActive}
          >
            {opt.icon}
            <span>{opt.label}</span>
            {isActive && (
              <Check className="h-3.5 w-3.5 ml-auto shrink-0" aria-hidden="true" />
            )}
          </button>
        );
      })}
    </div>
  );
}

function ResetProgressButton() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  function handleConfirm() {
    resetAllProgress();
    setDone(true);
    setTimeout(() => {
      setOpen(false);
      setDone(false);
    }, 1200);
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-[hsl(var(--foreground))]">
          Xóa tất cả tiến độ
        </p>
        <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">
          Xóa toàn bộ lịch sử hoàn thành, bài kiểm tra và checklist.
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 border-[hsl(var(--destructive))]/40 text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))]/10 hover:border-[hsl(var(--destructive))]/60"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Xóa
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa tiến độ</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            Thao tác này sẽ xóa vĩnh viễn toàn bộ tiến độ học tập, kết quả
            bài kiểm tra và checklist. Bạn không thể hoàn tác sau khi xác nhận.
          </p>

          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={done}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleConfirm}
              disabled={done}
            >
              {done ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Đã xóa
                </>
              ) : (
                <>
                  <Trash2 className="h-3.5 w-3.5" />
                  Xóa tất cả
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
        <Info className="h-4 w-4 text-[hsl(var(--primary))]" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
          AWS Starter Guide
        </p>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Phiên bản 1.0.0
        </p>
        <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed pt-0.5">
          Hướng dẫn thực hành từng bước để làm chủ các dịch vụ AWS cốt lõi —
          từ IAM, EC2, S3 đến serverless và kiến trúc cloud hiện đại.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
            Cài đặt
          </h1>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
            Tuỳ chỉnh giao diện và quản lý dữ liệu học tập của bạn.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          <SettingsSection
            title="Giao diện"
            description="Chọn chế độ hiển thị phù hợp với bạn."
          >
            <ThemeToggle />
          </SettingsSection>

          <SettingsSection
            title="Dữ liệu"
            description="Quản lý dữ liệu tiến độ được lưu trên thiết bị này."
          >
            <ResetProgressButton />
          </SettingsSection>

          <SettingsSection title="Giới thiệu">
            <AboutSection />
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}
