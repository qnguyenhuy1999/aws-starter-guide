import { Info, AlertTriangle, XCircle, Lightbulb, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "danger" | "tip" | "cost";

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const CONFIG: Record<CalloutType, { icon: React.ElementType; className: string; label: string }> = {
  info: {
    icon: Info,
    className: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-100",
    label: "Thông tin",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100",
    label: "Lưu ý",
  },
  danger: {
    icon: XCircle,
    className: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/50 dark:text-red-100",
    label: "Cảnh báo",
  },
  tip: {
    icon: Lightbulb,
    className: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-100",
    label: "Best Practice",
  },
  cost: {
    icon: DollarSign,
    className: "border-orange-200 bg-orange-50 text-orange-900 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-100",
    label: "Chi phí",
  },
};

export function Callout({ type, title, children, className }: CalloutProps) {
  const { icon: Icon, className: variantClass, label } = CONFIG[type];

  return (
    <div className={cn("flex gap-3 rounded-xl border p-4 my-4", variantClass, className)}>
      <Icon className="h-5 w-5 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm mb-1">{title ?? label}</p>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
