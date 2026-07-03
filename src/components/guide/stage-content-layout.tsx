
interface StageContentLayoutProps {
  children: React.ReactNode;
  toc?: React.ReactNode;
}

export default function StageContentLayout({
  children,
  toc,
}: StageContentLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 w-full">
      {toc && (
        <aside className="lg:hidden mb-6">
          {toc}
        </aside>
      )}

      <main className="flex-1 min-w-0 max-w-3xl">
        {children}
      </main>

      {toc && (
        <aside className="hidden lg:block w-64 shrink-0 self-start sticky top-6">
          {toc}
        </aside>
      )}
    </div>
  );
}
