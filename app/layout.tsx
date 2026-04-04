import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "VietClaw — AI Agent chạy ngay",
  description:
    "Setup 5 phút, hỗ trợ tiếng Việt 24/7. Dùng thử AI Agent không cần kỹ thuật.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={cn("dark theme scroll-smooth", inter.variable)}>
      <body className="min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
