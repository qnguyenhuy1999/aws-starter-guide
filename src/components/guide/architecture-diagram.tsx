import { cn } from "@/lib/utils";
import type { ArchitectureNode, ArchitectureConnection } from "@/types/guide";
import { ArrowRight } from "lucide-react";

interface ArchitectureDiagramProps {
  title: string;
  description?: string;
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
  className?: string;
}

const NODE_STYLES: Record<ArchitectureNode["type"], string> = {
  service: "bg-[hsl(var(--primary))]/10 border-[hsl(var(--primary))]/30 text-[hsl(var(--primary))]",
  user: "bg-[hsl(var(--success))]/10 border-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
  internet: "bg-[hsl(var(--secondary))] border-[hsl(var(--border))] text-[hsl(var(--secondary-foreground))]",
  group: "bg-[hsl(var(--muted))]/50 border-[hsl(var(--border))] text-[hsl(var(--foreground))]",
};

function DiagramNode({ node }: { node: ArchitectureNode }) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-xl border-2 px-4 py-3 min-w-24 text-center", NODE_STYLES[node.type])}>
      <span className="text-xs font-bold leading-tight">{node.label}</span>
      {node.sublabel && <span className="text-xs opacity-70 mt-0.5">{node.sublabel}</span>}
    </div>
  );
}

export function ArchitectureDiagram({
  title,
  description,
  nodes,
  connections,
  className,
}: ArchitectureDiagramProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  // Build rows: for simplicity, lay out nodes in a single horizontal flow
  // using connections to determine order
  const orderedIds: string[] = [];
  if (connections.length > 0) {
    const firstConn = connections[0];
    orderedIds.push(firstConn.from);
    connections.forEach((c) => {
      if (!orderedIds.includes(c.to)) orderedIds.push(c.to);
    });
    nodes.forEach((n) => {
      if (!orderedIds.includes(n.id)) orderedIds.push(n.id);
    });
  } else {
    nodes.forEach((n) => orderedIds.push(n.id));
  }

  return (
    <div className={cn("rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 my-6", className)}>
      <h3 className="font-semibold text-sm text-[hsl(var(--muted-foreground))] mb-1 uppercase tracking-wide">Kiến trúc</h3>
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      {description && <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">{description}</p>}

      {/* Diagram */}
      <div className="overflow-x-auto">
        <div className="flex flex-wrap items-center gap-2 min-w-max mx-auto justify-center py-4">
          {orderedIds.map((id, index) => {
            const node = nodeMap.get(id);
            if (!node) return null;
            const conn = connections[index];
            return (
              <div key={id} className="flex items-center gap-2">
                <DiagramNode node={node} />
                {conn && index < orderedIds.length - 1 && (
                  <div className="flex flex-col items-center gap-0.5">
                    <ArrowRight className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                    {conn.label && <span className="text-xs text-[hsl(var(--muted-foreground))]">{conn.label}</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
