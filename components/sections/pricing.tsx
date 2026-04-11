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

const BTN_START = "Bắt đầu";

const plans: {
  name: string;
  price: string;
  period: string;
  ram: string;
  cpu: string;
  tier: PlanTier;
  accent: string;
  description: string;
  features: string[];
  badge?: string;
  cta?: string;
  ctaLink?: string;
}[] = [
  {
    name: "Starter",
    price: "299k",
    period: "/tháng",
    ram: "4GB RAM",
    cpu: "2 vCPU",
    tier: "default",
    accent: "#FF6B35",
    description: "Khởi đầu với VPS ổn định và điều khiển mọi thứ qua Telegram.",
    features: [
      "VPS 4GB RAM / 2 vCPU, hoạt động 24/7",
      "Cài đặt OpenClaw miễn phí",
      "Điều khiển toàn bộ qua Telegram",
      "Kết nối Gmail, Facebook Page, Google Sheet",
      "Tự do tùy chỉnh đầy đủ",
    ],
  },
  {
    name: "Pro",
    price: "599k",
    period: "/tháng",
    ram: "8GB RAM",
    cpu: "4 vCPU",
    tier: "popular",
    accent: "#00D4FF",
    description: "Tự động hóa nâng cao, kế toán AI và chăm sóc khách hàng tự động.",
    features: [
      "Tất cả tính năng Starter",
      "n8n workflows tích hợp sẵn",
      "Kế toán AI: tự động ghi nhận doanh thu/chi phí",
      "Báo cáo doanh thu hàng ngày qua Telegram",
      "Tự động chăm sóc và follow-up khách hàng",
      "API key linh hoạt (pay-as-you-go)",
    ],
    badge: "Phổ biến nhất",
  },
  {
    name: "Business",
    price: "2.299k",
    period: "/tháng",
    ram: "8GB RAM",
    cpu: "4 vCPU",
    tier: "featured",
    accent: "#FF2D78",
    description:
      "Toàn bộ sức mạnh AI trong một gói — tạo nội dung, tự động hóa và vận hành 24/7.",
    features: [
      "Tất cả tính năng Pro",
      "VPS nâng cấp 8GB RAM / 4 vCPU",
      "🔥 Super AI Bundle mỗi tháng: 5,000,000 tokens · 750 ảnh 2K · 25 video AI",
      "Tạo ảnh với Nano Banana Pro, video với Seedance 2.0",
      "Chỉ nhắn mô tả trên Telegram → nhận ảnh/video ngay",
      "Tích hợp Zalo, WhatsApp, Discord",
      "Setup đầy đủ bởi đội ngũ VietClaw",
    ],
  },
  {
    name: "Enterprise",
    price: "Liên hệ",
    period: "",
    ram: "32GB RAM",
    cpu: "8 vCPU",
    tier: "default",
    accent: "#FFD700",
    description: "Hạ tầng tùy chỉnh hoàn toàn, SLA và đội ngũ kỹ thuật riêng.",
    features: [
      "Hạ tầng tùy chỉnh, không giới hạn bot",
      "Tích hợp ERP/CRM/phần mềm nội bộ",
      "SLA uptime 99.9%",
      "Đội kỹ thuật riêng",
    ],
    cta: "Liên hệ ngay",
    ctaLink: "mailto:contact@vietclaw.net",
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
                    {plan.badge}
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
                <p>{plan.description}</p>
                <p>{plan.ram}</p>
                <p>{plan.cpu}</p>
                {plan.features.map((feature) => (
                  <p key={feature}>{feature}</p>
                ))}
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
                  href={plan.ctaLink ?? "/register"}
                  className={cn(
                    "inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg border-2 text-sm font-semibold whitespace-nowrap outline-none transition-[filter] select-none hover:brightness-110 active:brightness-95",
                    plan.name === "Enterprise" ? "text-[#1A0F3E]" : "text-white"
                  )}
                  style={{
                    borderColor: plan.accent,
                    backgroundColor: plan.accent,
                  }}
                >
                  {plan.ctaLink ? plan.cta : BTN_START}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
