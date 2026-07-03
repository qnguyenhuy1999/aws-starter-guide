import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))]", className)}>
      <Link href="/" className="hover:text-[hsl(var(--foreground))] transition-colors">
        <Home className="h-4 w-4" />
        <span className="sr-only">Trang chủ</span>
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[hsl(var(--foreground))] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[hsl(var(--foreground))] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
