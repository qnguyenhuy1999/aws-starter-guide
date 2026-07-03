"use client";

import { useEffect } from "react";
import { setLastVisitedStage } from "@/lib/progress-storage";

interface StageTrackerProps {
  slug: string;
}

export function StageTracker({ slug }: StageTrackerProps) {
  useEffect(() => {
    setLastVisitedStage(slug);
  }, [slug]);

  return null;
}
