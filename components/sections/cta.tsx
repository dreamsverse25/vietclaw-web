import Link from "next/link";

import { cn } from "@/lib/utils";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2D1B69] via-[#1a1245] to-[#051010] px-4 py-20 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.12), transparent), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(34,197,94,0.15), transparent)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-4 text-5xl sm:text-6xl" aria-hidden>
          🚀
        </p>
        <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[#F4F2FF] sm:text-5xl md:text-6xl">
          <span className="text-white">MIỄN PHÍ </span>
          <span className="bg-gradient-to-r from-primary via-emerald-300 to-green-400 bg-clip-text text-transparent">
            7 NGÀY
          </span>
        </h2>
        <Link
          href="#pricing"
          className={cn(
            "mt-10 inline-flex h-14 items-center justify-center rounded-full border-2 border-emerald-400/90 bg-gradient-to-r from-emerald-700 to-green-600 px-10 text-base font-bold text-white shadow-[0_0_28px_rgba(34,197,94,0.45)] transition hover:brightness-110"
          )}
        >
          Dùng thử 7 ngày miễn phí
        </Link>
      </div>
    </section>
  );
}
