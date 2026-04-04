import { Star } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const testimonials = [
  {
    name: "Minh Anh",
    role: "Trưởng phòng CSKH",
    company: "Shop thời trang online",
    quote:
      "Agent trả lời tin nhắn đúng tone thương hiệu, tụi mình giảm 40% tải cho team.",
  },
  {
    name: "Quốc Huy",
    role: "Founder",
    company: "Agency marketing HCM",
    quote:
      "Khách agency cần báo cáo nhanh — VietClaw hook được CRM và gửi bản tóm tắt tự động.",
  },
  {
    name: "Thu Giang",
    role: "COO",
    company: "Startup logistics",
    quote:
      "Setup đúng như quảng cáo: chiều đăng ký, tối đã chạy thử. Hỗ trợ tiếng Việt rất nhiệt.",
  },
] as const;

function StarRow() {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label="5 trên 5 sao"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-4 fill-[#F59E0B] text-[#F59E0B]"
          aria-hidden
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0D0A2E] via-[#120a32] to-[#0D0A2E] px-4 py-20 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(124,58,237,0.25) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(0,212,255,0.12) 0%, transparent 40%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#F4F2FF] sm:text-4xl">
            Khách hàng nói gì
          </h2>
          <p className="mt-3 text-muted-foreground">
            Hàng trăm chủ shop, freelancer và doanh nghiệp đang dùng VietClaw
            mỗi ngày.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="relative overflow-hidden border-[#C4B5FD]/30 bg-[#1A0F3E]/70"
            >
              <span
                className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 font-serif text-7xl leading-none text-[#7C3AED]/55 md:text-8xl"
                aria-hidden
              >
                &ldquo;
              </span>
              <CardHeader className="relative z-[1] pt-10">
                <StarRow />
                <CardTitle className="mt-4 text-lg text-[#F4F2FF]">
                  {t.name}
                </CardTitle>
                <CardDescription>
                  {t.role} — {t.company}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-[1]">
                <p className="text-sm italic leading-relaxed text-primary/95">
                  {t.quote}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
