import { cn } from "@/lib/utils";
import { getServiceColor } from "@/lib/utils";
import type { AwsService } from "@/types/guide";

interface ServiceBadgeProps {
  service: AwsService;
  className?: string;
}

export function ServiceBadge({ service, className }: ServiceBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        getServiceColor(service),
        className
      )}
    >
      {service}
    </span>
  );
}
