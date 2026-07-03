import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p
        className="text-[8rem] font-extrabold leading-none tracking-tight text-muted select-none"
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
    </main>
  );
}
