import { cn } from "@/lib/utils";

interface TocSection {
  id: string;
  label: string;
}

const DEFAULT_SECTIONS: TocSection[] = [
  { id: "kien-thuc", label: "Kiến thức" },
  { id: "aws-console", label: "AWS Console" },
  { id: "lab", label: "Lab thực hành" },
  { id: "best-practices", label: "Best Practices" },
  { id: "checklist", label: "Checklist" },
  { id: "quiz", label: "Quiz" },
];

interface TableOfContentsProps {
  sections?: TocSection[];
}

export default function TableOfContents({ sections = DEFAULT_SECTIONS }: TableOfContentsProps) {
  return (
    <aside className="sticky top-6 w-full">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">
        Mục lục
      </p>
      <div className="h-px bg-border mb-3" />
      <nav aria-label="Mục lục trang">
        <ul className="flex flex-col gap-0.5">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  "block rounded-md px-2 py-1.5 text-sm text-muted-foreground",
                  "transition-colors duration-150",
                  "hover:text-foreground hover:bg-accent",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                )}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export { TableOfContents };
