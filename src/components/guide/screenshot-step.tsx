import { ImageGuidePlaceholder } from "@/components/guide/image-guide-placeholder";
import { cn } from "@/lib/utils";

interface ScreenshotStepProps {
  step: number;
  title: string;
  description: string;
  imagePath: string;
  alt: string;
  className?: string;
}

export function ScreenshotStep({ step, title, description, imagePath, alt, className }: ScreenshotStepProps) {
  return (
    <div className={cn("flex gap-4 mb-8", className)}>
      <div className="shrink-0">
        <div className="h-8 w-8 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] flex items-center justify-center text-sm font-bold">
          {step}
        </div>
        <div className="w-px h-full bg-[hsl(var(--border))] mx-auto mt-2" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">{description}</p>
        <ImageGuidePlaceholder
          title={title}
          description={description}
          imagePath={imagePath}
          alt={alt}
          step={step}
        />
      </div>
    </div>
  );
}
