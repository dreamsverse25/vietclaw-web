import { Clock, HeadphonesIcon, Smartphone } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const items = [
  {
    icon: Clock,
    title: "Setup 5 phút",
    description:
      "Kích hoạt agent trong vài bước — giao diện rõ ràng, không cần DevOps.",
  },
  {
    icon: HeadphonesIcon,
    title: "Hỗ trợ TV 24/7",
    description:
      "Đội ngũ tiếng Việt trực chat và ticket mọi lúc, kể cả cuối tuần.",
  },
  {
    icon: Smartphone,
    title: "Thanh toán thuận tiện",
    description:
      "Hỗ trợ MoMo, VNPay, QR Code, chuyển khoản ngân hàng — thanh toán nhanh, không cần thẻ quốc tế.",
  },
] as const;

export function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-20 bg-[#1A0F3E] px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#F4F2FF] sm:text-4xl">
            Vì sao chọn VietClaw?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Giải pháp AI automation dành riêng cho doanh nghiệp Việt — dễ dùng,
            tiết kiệm chi phí, tăng doanh thu.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="border-[#C4B5FD]/35 bg-[#2D1B69]/50 shadow-none ring-0 transition-shadow hover:border-[#C4B5FD]/55"
            >
              <CardHeader>
                <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <CardTitle className="text-lg text-[#F4F2FF]">{title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
