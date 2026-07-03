import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/app/theme-provider";
import { AppShell } from "@/components/app/app-shell";

export const metadata: Metadata = {
  title: {
    default: "AWS Starter Guide",
    template: "%s | AWS Starter Guide",
  },
  description: "Lộ trình học AWS từ con số 0 cho Fullstack/Backend Developer. Hướng dẫn thực hành từng bước với labs, quiz, và kiến trúc thực tế.",
  keywords: ["AWS", "Amazon Web Services", "Cloud", "DevOps", "Fullstack", "Backend", "Học AWS"],
  openGraph: {
    title: "AWS Starter Guide",
    description: "Lộ trình học AWS từ con số 0 cho Fullstack/Backend Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
