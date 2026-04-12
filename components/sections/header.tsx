"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const nav = [
  { href: "#features", label: "T\xednh n\u0103ng" },
  { href: "#pricing", label: "B\u1ea3ng gi\xe1" },
  { href: "/docs", label: "H\u01b0\u1edbng d\u1eabn" },
  { href: "#faq", label: "FAQ" },
];

const LABELS = {
  homeAria: "VietClaw \u2014 Trang ch\u1ee7",
  signIn: "\u0110\u0103ng nh\u1eadp",
  signUp: "\u0110\u0103ng k\xfd",
  dashboard: "Dashboard",
} as const;

const ghostOnDark = cn(
  buttonVariants({ variant: "ghost", size: "sm" }),
  "border border-[#C4B5FD]/35 text-[#F4F2FF] hover:bg-[#C4B5FD]/15 hover:text-[#F4F2FF]",
);

const outlineSignUp = cn(
  buttonVariants({ variant: "outline", size: "sm" }),
  "border-[#C4B5FD]/40 bg-[#2D1B69]/40 text-[#F4F2FF] hover:bg-[#C4B5FD]/12 hover:text-[#F4F2FF]",
);

const dashboardBtn = cn(
  buttonVariants({ variant: "default", size: "sm" }),
  "border-2 border-[#00d4ff] bg-[#00d4ff] font-semibold text-[#1a0f3e] hover:brightness-110",
);

export function Header() {
  const { user, isLoaded } = useUser();
  const signedIn = !!user;

  return (
    <header className="sticky top-0 z-50 border-b border-[#C4B5FD]/25 bg-[#2D1B69]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="#"
          className="flex h-full shrink-0 items-center gap-2 leading-none"
          aria-label={LABELS.homeAria}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/vietclaw-logo.png"
            alt="VietClaw"
            className="h-10 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
          />
        </Link>
        <nav className="hidden h-full flex-1 items-center justify-center gap-8 text-sm font-medium sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex min-h-8 shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-2">
          {!isLoaded ? (
            <span
              className="inline-block h-8 w-24 animate-pulse rounded-lg bg-[#C4B5FD]/20"
              aria-hidden
            />
          ) : signedIn ? (
            <Link href="/dashboard" className={dashboardBtn}>
              {LABELS.dashboard}
            </Link>
          ) : (
            <>
              <Link href="/login" className={ghostOnDark}>
                {LABELS.signIn}
              </Link>
              <Link href="/register" className={outlineSignUp}>
                {LABELS.signUp}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
