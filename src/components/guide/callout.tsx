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
    className: "border-[hsl(var(--info))]/20 bg-[hsl(var(--info))]/10 text-[hsl(var(--foreground))]",
    label: "Thông tin",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-[hsl(var(--warning))]/20 bg-[hsl(var(--warning))]/10 text-[hsl(var(--foreground))]",
    label: "Lưu ý",
  },
  danger: {
    icon: XCircle,
    className: "border-[hsl(var(--destructive))]/20 bg-[hsl(var(--destructive))]/10 text-[hsl(var(--foreground))]",
    label: "Cảnh báo",
  },
  tip: {
    icon: Lightbulb,
    className: "border-[hsl(var(--success))]/20 bg-[hsl(var(--success))]/10 text-[hsl(var(--foreground))]",
    label: "Best Practice",
  },
  cost: {
    icon: DollarSign,
    className: "border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
    label: "Chi phí",
  },
};

export function Callout({ type, title, children, className }: CalloutProps) {
  const { icon: Icon, className: variantClass, label } = CONFIG[type];

  return (
    <div className={cn("flex gap-3 rounded-2xl border p-4 my-4", variantClass, className)}>
      <Icon className="h-5 w-5 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm mb-1">{title ?? label}</p>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
