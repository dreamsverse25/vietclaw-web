import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const META = {
  title: "B\u1ea3ng gi\xe1 \u2014 VietClaw",
  description:
    "Starter, Pro, Business v\xe0 Enterprise \u2014 OpenClaw, Telegram, t\u1ef1 \u0111\u1ed9ng h\xf3a v\xe0 AI cho doanh nghi\u1ec7p.",
} as const;

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
};

type Plan = {
  id: string;
  name: string;
  priceLine: string;
  subPrice?: string;
  description: string;
  features: string[];
  highlight: boolean;
  cta: "register" | "mailto";
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    priceLine: "299.000\u0111/th\xe1ng",
    description:
      "Kh\u1edfi \u0111\u1ea7u v\u1edbi VPS \u1ed5n \u0111\u1ecbnh v\xe0 \u0111i\u1ec1u khi\u1ec3n m\u1ecdi th\u1ee9 qua Telegram.",
    features: [
      "VPS 4 GB RAM / 2 vCPU, ho\u1ea1t \u0111\u1ed9ng 24/7",
      "C\xe0i \u0111\u1eb7t OpenClaw mi\u1ec5n ph\xed",
      "\u0110i\u1ec1u khi\u1ec3n to\xe0n b\u1ed9 qua Telegram",
      "K\u1ebft n\u1ed1i Gmail, Facebook Page, Google Sheet",
      "T\u1ef1 do t\xf9y ch\u1ec9nh \u0111\u1ea7y \u0111\u1ee7",
    ],
    highlight: false,
    cta: "register",
  },
  {
    id: "pro",
    name: "Pro",
    priceLine: "599.000\u0111/th\xe1ng",
    description:
      "T\u1ef1 \u0111\u1ed9ng h\xf3a n\xe2ng cao, k\u1ebf to\xe1n AI v\xe0 ch\u0103m s\xf3c kh\xe1ch t\u1ef1 \u0111\u1ed9ng.",
    features: [
      "T\u1ea5t c\u1ea3 t\xednh n\u0103ng Starter",
      "n8n workflows t\xedch h\u1ee3p s\u1eb5n (t\u1ef1 \u0111\u1ed9ng h\xf3a quy tr\xecnh)",
      "K\u1ebf to\xe1n AI: t\u1ef1 \u0111\u1ed9ng ghi nh\u1eadn doanh thu/chi ph\xed",
      "B\xe1o c\xe1o doanh thu h\xe0ng ng\xe0y qua Telegram",
      "T\u1ef1 \u0111\u1ed9ng ch\u0103m s\xf3c v\xe0 follow-up kh\xe1ch h\xe0ng",
      "API key linh ho\u1ea1t (pay-as-you-go, x\xe0i nhi\u1ec1u tr\u1ea3 nhi\u1ec1u)",
    ],
    highlight: true,
    cta: "register",
  },
  {
    id: "business",
    name: "Business",
    priceLine: "1.199.000\u0111/th\xe1ng",
    description:
      "VPS m\u1ea1nh h\u01a1n, t\u1ea1o \u1ea3nh/video AI v\xe0 t\xedch h\u1ee3p \u0111a k\xeanh.",
    features: [
      "T\u1ea5t c\u1ea3 t\xednh n\u0103ng Pro",
      "VPS n\xe2ng c\u1ea5p 8 GB RAM / 4 vCPU",
      "T\u1ea1o \u1ea3nh AI l\xean \u0111\u1ebfn 200 \u1ea3nh/th\xe1ng (ch\u1ea5t l\u01b0\u1ee3ng 2K, model Nano Banana Pro)",
      "T\u1ea1o video AI l\xean \u0111\u1ebfn 20 video/th\xe1ng (Seedance 2.0)",
      "Ch\u1ec9 c\u1ea7n nh\u1eafn m\xf4 t\u1ea3 tr\xean Telegram \u2192 nh\u1eadn \u1ea3nh/video ngay",
      "T\xedch h\u1ee3p th\xeam: Zalo, WhatsApp, Discord",
      "Setup \u0111\u1ea7y \u0111\u1ee7 b\u1edfi \u0111\u1ed9i ng\u0169 VietClaw",
    ],
    highlight: false,
    cta: "register",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceLine: "Li\xean h\u1ec7 b\xe1o gi\xe1",
    description:
      "H\u1ea1 t\u1ea7ng ri\xeang, SLA v\xe0 \u0111\u1ed9i ng\u0169 k\u1ef9 thu\u1eadt d\xe0nh cho b\u1ea1n.",
    features: [
      "H\u1ea1 t\u1ea7ng t\xf9y ch\u1ec9nh ho\xe0n to\xe0n, kh\xf4ng gi\u1edbi h\u1ea1n bot",
      "T\xedch h\u1ee3p ERP/CRM/ph\u1ea7n m\u1ec1m n\u1ed9i b\u1ed9",
      "SLA uptime 99.9%",
      "\u0110\u1ed9i k\u1ef9 thu\u1eadt ri\xeang",
    ],
    highlight: false,
    cta: "mailto",
  },
];

const faqs = [
  {
    q: "Gi\xe1 c\xe1c g\xf3i \u0111\xe3 g\u1ed3m VAT v\xe0 ph\xed c\xe0i \u0111\u1eb7t ch\u01b0a?",
    a: "M\u1ee9c gi\xe1 hi\u1ec3n th\u1ecb l\xe0 gi\xe1 g\xf3i d\u1ecbch v\u1ee5 theo th\xe1ng. VAT (n\u1ebfu c\xf3) v\xe0 \u0111i\u1ec1u kho\u1ea3n h\xf3a \u0111\u01a1n s\u1ebd \u0111\u01b0\u1ee3c x\xe1c nh\u1eadn khi k\xfd h\u1ee3p \u0111\u1ed3ng. Ph\xed c\xe0i \u0111\u1eb7t OpenClaw tr\xean g\xf3i Starter \u0111\u01b0\u1ee3c mi\u1ec5n ph\xed theo m\xf4 t\u1ea3 g\xf3i.",
  },
  {
    q: "T\xf4i c\xf3 th\u1ec3 n\xe2ng c\u1ea5p ho\u1eb7c h\u1ea1 g\xf3i gi\u1eefa ch\u1ee9ng kh\xf4ng?",
    a: "C\xf3. B\u1ea1n c\xf3 th\u1ec3 n\xe2ng t\u1eeb Starter l\xean Pro/Business ho\u1eb7c \u0111i\u1ec1u ch\u1ec9nh theo nhu c\u1ea7u; th\u1eddi \u0111i\u1ec3m v\xe0 c\xe1ch t\xednh ch\xeanh l\u1ec7ch s\u1ebd \u0111\u01b0\u1ee3c h\u1ed7 tr\u1ee3 vi\xean VietClaw x\xe1c nh\u1eadn khi b\u1ea1n y\xeau c\u1ea7u.",
  },
  {
    q: "H\u1ed7 tr\u1ee3 k\u1ef9 thu\u1eadt kh\xe1c nhau ra sao gi\u1eefa c\xe1c g\xf3i?",
    a: "Starter/Pro/Business nh\u1eadn h\u1ed7 tr\u1ee3 theo k\xeanh chu\u1ea9n c\u1ee7a g\xf3i; Business c\xf3 setup \u0111\u1ea7y \u0111\u1ee7 b\u1edfi \u0111\u1ed9i VietClaw. Enterprise c\xf3 \u0111\u1ed9i k\u1ef9 thu\u1eadt ri\xeang v\xe0 SLA r\xf5 r\xe0ng.",
  },
  {
    q: "Enterprise c\xf3 gi\u1edbi h\u1ea1n s\u1ed1 bot hay lu\u1ed3ng t\xedch h\u1ee3p kh\xf4ng?",
    a: "Enterprise thi\u1ebft k\u1ebf theo h\u1ea1 t\u1ea7n t\xf9y ch\u1ec9nh v\xe0 kh\xf4ng gi\u1edbi h\u1ea1n bot theo m\xf4 t\u1ea3; chi ti\u1ebft t\u1ea3i v\xe0 t\xedch h\u1ee3p ERP/CRM s\u1ebd \u0111\u01b0\u1ee3c b\xe1o gi\xe1 v\xe0 ph\u1ea1m vi ri\xeang cho t\u1eebng doanh nghi\u1ec7p.",
  },
];

const UI = {
  back: "\u2190 V\u1ec1 trang ch\u1ee7",
  heroTitle: "B\u1ea3ng gi\xe1 VietClaw",
  heroSub:
    "B\u1ed1n g\xf3i cho t\u1eebng giai \u0111o\u1ea1n t\u0103ng tr\u01b0\u1edfng \u2014 ch\u1ec9 li\u1ec7t k\xea nh\u1eefng g\xec g\xf3i \u0111\xf3 mang l\u1ea1i.",
  popularBadge: "Ph\u1ed5 bi\u1ebfn nh\u1ea5t",
  choose: (name: string) => `Ch\u1ecdn ${name}`,
  contactNow: "Li\xean h\u1ec7 ngay",
  faqTitle: "C\xe2u h\u1ecfi th\u01b0\u1eddng g\u1eb7p",
  faqSub: "Gi\xe1, h\u1ed7 tr\u1ee3 v\xe0 n\xe2ng c\u1ea5p g\xf3i.",
  mailto: "mailto:contact@vietclaw.net",
} as const;

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100">
      <header className="border-b border-white/10 bg-[#111]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-[#00d4ff]"
          >
            {UI.back}
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#00d4ff]">
            VietClaw
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {UI.heroTitle}
          </h1>
          <p className="mt-3 text-balance text-neutral-400 sm:text-lg">
            {UI.heroSub}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "flex flex-col border-white/10 bg-[#111] text-neutral-100 ring-1 ring-white/5",
                plan.highlight &&
                  "relative z-10 border-[#00d4ff]/50 shadow-[0_0_0_1px_rgba(0,212,255,0.25)] ring-[#00d4ff]/20 sm:scale-[1.02]",
              )}
            >
              {plan.highlight ? (
                <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
                  <Badge
                    variant="outline"
                    className="border-[#00d4ff]/50 bg-[#00d4ff]/10 text-[#00d4ff]"
                  >
                    {UI.popularBadge}
                  </Badge>
                </div>
              ) : null}
              <CardHeader
                className={cn(
                  "gap-2",
                  plan.highlight && "pt-11 sm:pt-12",
                  !plan.highlight && "pt-6",
                )}
              >
                <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                <CardDescription className="text-neutral-400">
                  {plan.description}
                </CardDescription>
                <div className="pt-1 text-lg font-semibold text-[#00d4ff]">
                  {plan.priceLine}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2.5 text-sm leading-snug text-neutral-300">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span
                        className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-[#00d4ff]"
                        aria-hidden
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="border-t border-white/10 bg-[#0a0a0a]/80">
                {plan.cta === "register" ? (
                  <form action="/register" method="get" className="w-full">
                    <Button
                      type="submit"
                      className={cn(
                        "w-full font-semibold",
                        plan.highlight
                          ? "border-2 border-[#00d4ff] bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#33ddff]"
                          : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
                      )}
                      size="default"
                    >
                      {UI.choose(plan.name)}
                    </Button>
                  </form>
                ) : (
                  <a
                    href={UI.mailto}
                    className={cn(
                      buttonVariants({ size: "default" }),
                      "w-full border-2 border-[#00d4ff] bg-[#00d4ff] font-semibold text-[#0a0a0a] hover:bg-[#33ddff]",
                    )}
                  >
                    {UI.contactNow}
                  </a>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="text-center font-heading text-2xl font-semibold text-white">
            {UI.faqTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-neutral-400">
            {UI.faqSub}
          </p>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {faqs.map((item) => (
              <Card
                key={item.q}
                className="border-white/10 bg-[#111] text-neutral-100 ring-1 ring-white/5"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-white">{item.q}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {item.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
