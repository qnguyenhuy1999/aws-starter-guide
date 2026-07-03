import Fuse from "fuse.js";
import { stages } from "@/content/stages";
import { glossaryTerms } from "@/content/glossary";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  type: "stage" | "lab" | "glossary" | "cheatsheet";
  tags?: string[];
}

function buildSearchIndex(): SearchResult[] {
  const items: SearchResult[] = [];

  // Stages
  stages.forEach((stage) => {
    items.push({
      id: `stage-${stage.id}`,
      title: `Giai đoạn ${stage.id}: ${stage.title}`,
      description: stage.subtitle,
      href: `/stages/${stage.slug}`,
      type: "stage",
      tags: stage.services,
    });

    // Labs from each stage
    stage.labs.forEach((lab) => {
      items.push({
        id: `lab-${lab.id}`,
        title: lab.title,
        description: lab.objective,
        href: `/labs/${lab.slug}`,
        type: "lab",
        tags: stage.services,
      });
    });
  });

  // Glossary
  glossaryTerms.forEach((term) => {
    items.push({
      id: `glossary-${term.id}`,
      title: term.term,
      description: term.definition.slice(0, 120) + "...",
      href: `/glossary#${term.id}`,
      type: "glossary",
      tags: [term.category],
    });
  });

  return items;
}

const searchIndex = buildSearchIndex();

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.3 },
    { name: "tags", weight: 0.3 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
});

export function search(query: string): SearchResult[] {
  if (!query.trim()) return [];
  return fuse.search(query).map((result) => result.item).slice(0, 10);
}
