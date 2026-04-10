import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
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
    "Setup 5 ph\u00fat, h\u1ED7 tr\u1EE3 ti\u1EBFng Vi\u1EC7t 24/7. D\u00F9ng th\u1EED AI Agent kh\u00F4ng c\u1EA7n k\u1EF9 thu\u1EADt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={cn("dark theme scroll-smooth", inter.variable)}>
      <body className="min-h-screen antialiased font-sans">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
