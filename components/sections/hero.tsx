import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const circuitPattern =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='%23A78BFA' stroke-width='0.35' opacity='0.35'%3E%3Cpath d='M10 50h20v10h20M50 10v25h25M10 90h40M90 50H70V30H50'/%3E%3Ccircle cx='30' cy='50' r='1.2' fill='%23A78BFA'/%3E%3Ccircle cx='50' cy='30' r='1.2' fill='%237C3AED'/%3E%3Ccircle cx='75' cy='60' r='1.2' fill='%2300D4FF'/%3E%3Cpath d='M60 70h20v20'/%3E%3C/g%3E%3C/svg%3E\")";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1A0533] to-[#2D1B69] px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: circuitPattern,
          backgroundSize: "100px 100px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-15%,rgba(0,212,255,0.18),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
          VietClaw
        </p>
        <h1 className="font-heading text-balance text-4xl font-bold tracking-tight text-[#F4F2FF] sm:text-5xl md:text-6xl">
          AI Agent chạy ngay —{" "}
          <span className="text-primary">Không cần kỹ thuật</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-primary/90">
          Setup 5 phút, hỗ trợ tiếng Việt 24/7
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#pricing"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-12 min-w-[200px] px-8 text-base shadow-lg shadow-primary/25"
            )}
          >
            Dùng thử 7 ngày miễn phí
          </Link>
          <Link
            href="#features"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 min-w-[160px] border-primary/50 bg-[#2D1B69]/40 text-base text-[#F4F2FF] backdrop-blur-sm hover:border-primary hover:bg-primary/10"
            )}
          >
            Xem demo
          </Link>
        </div>
      </div>
    </section>
  );
}
