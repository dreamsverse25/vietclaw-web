import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type PlanTier = "default" | "popular" | "featured";

const plans: {
  name: string;
  price: string;
  period: string;
  ram: string;
  cpu: string;
  tier: PlanTier;
  accent: string;
}[] = [
  {
    name: "Starter",
    price: "299k",
    period: "/tháng",
    ram: "4GB RAM",
    cpu: "2 vCPU",
    tier: "default",
    accent: "#FF6B35",
  },
  {
    name: "Pro",
    price: "599k",
    period: "/tháng",
    ram: "8GB RAM",
    cpu: "4 vCPU",
    tier: "popular",
    accent: "#4CAF50",
  },
  {
    name: "Business",
    price: "1.199k",
    period: "/tháng",
    ram: "16GB RAM",
    cpu: "6 vCPU",
    tier: "featured",
    accent: "#E91E8C",
  },
  {
    name: "Agency",
    price: "2.199k",
    period: "/tháng",
    ram: "32GB RAM",
    cpu: "8 vCPU",
    tier: "default",
    accent: "#FFC107",
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 bg-[#2D1B69] px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#F4F2FF] sm:text-4xl">
            Bảng giá
          </h2>
          <p className="mt-3 text-muted-foreground">
            Chọn gói phù hợp quy mô agent — nâng cấp hoặc hạ cấp linh hoạt.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-xl shadow-none transition-shadow",
                plan.tier === "popular" &&
                  "z-[1] overflow-visible border-2 bg-[#2D1B69]/70 shadow-lg",
                plan.tier === "default" && "border-2 bg-[#2D1B69]/60",
                plan.tier === "featured" &&
                  "border-2 bg-[#1A0F3E] text-white"
              )}
              style={{
                borderColor: plan.accent,
                ...(plan.tier === "popular"
                  ? { boxShadow: `0 10px 25px -5px ${plan.accent}33` }
                  : {}),
              }}
            >
              {plan.tier === "popular" ? (
                <div className="absolute left-1/2 top-0 z-30 -mt-4 -translate-x-1/2">
                  <span
                    className="inline-flex h-6 items-center rounded-full px-3 text-xs font-semibold text-white shadow-md"
                    style={{ backgroundColor: plan.accent }}
                  >
                    Phổ biến
                  </span>
                </div>
              ) : null}
              <CardHeader className={cn("pt-8", plan.tier === "popular" && "pt-9")}>
                <CardTitle
                  className={cn(
                    "text-xl",
                    plan.tier === "featured" && "text-white"
                  )}
                >
                  {plan.name}
                </CardTitle>
                <CardDescription
                  className={cn(
                    "space-y-1 pt-2",
                    plan.tier === "featured" && "text-violet-200/80"
                  )}
                >
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-heading text-3xl font-bold"
                      style={{ color: plan.accent }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        plan.tier === "featured"
                          ? "text-violet-200/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {plan.period}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent
                className={cn(
                  "flex-1 space-y-2 text-sm",
                  plan.tier === "featured"
                    ? "text-violet-100/85"
                    : "text-muted-foreground"
                )}
              >
                <p>{plan.ram}</p>
                <p>{plan.cpu}</p>
              </CardContent>
              <CardFooter
                className={cn(
                  "border-t pt-4",
                  plan.tier === "featured"
                    ? "border-white/10 bg-black/15"
                    : "border-white/10"
                )}
              >
                <Link
                  href="mailto:hello@vietclaw.net?subject=Đăng%20ký%20gói%20"
                  className={cn(
                    "inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg border-2 text-sm font-semibold whitespace-nowrap outline-none transition-[filter] select-none hover:brightness-110 active:brightness-95",
                    plan.name === "Agency" ? "text-[#1A0F3E]" : "text-white"
                  )}
                  style={{
                    borderColor: plan.accent,
                    backgroundColor: plan.accent,
                  }}
                >
                  Chọn gói
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
