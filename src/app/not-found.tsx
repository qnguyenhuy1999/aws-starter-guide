import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-lg border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))]/80">
        <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <p
            className="text-[6rem] font-extrabold leading-none tracking-tight text-[hsl(var(--muted-foreground))]/30 select-none"
            aria-hidden="true"
          >
            404
          </p>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            Trang không tìm thấy
          </h1>

          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className={buttonVariants()}>Về trang chủ</Link>
            <Link href="/roadmap" className={buttonVariants({ variant: "outline" })}>Xem roadmap</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
