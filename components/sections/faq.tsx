import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    value: "trial",
    q: "Dùng thử 7 ngày miễn phí gồm những gì?",
    a: "Bạn dùng đầy đủ tính năng theo gói đã chọn, có giới hạn tài nguyên hiển thị trong dashboard. Không cần thẻ tín dụng để bắt đầu.",
  },
  {
    value: "cancel",
    q: "Hủy hoặc đổi gói có khó không?",
    a: "Không — đổi gói trong vài cú nhấp, hiệu lực theo chu kỳ thanh toán. Hủy không phạt nếu bạn dùng MoMo và không còn chu kỳ đã trừ tiền.",
  },
  {
    value: "momo",
    q: "Thanh toán MoMo hoạt động thế nào?",
    a: "Mỗi tháng hệ thống tạo mã QR / deep link MoMo; sau khi thanh toán thành công, gói được gia hạn tự động. Bạn nhận email xác nhận.",
  },
  {
    value: "support",
    q: "Hỗ trợ tiếng Việt 24/7 là hình thức nào?",
    a: "Chat trong app, email và ticket ưu tiên. Đội phản hồi trung bình dưới 15 phút trong giờ cao điểm.",
  },
  {
    value: "data",
    q: "Dữ liệu của tôi có được bảo mật không?",
    a: "Traffic HTTPS, phân vùng theo tenant, và tùy chọn xóa dữ liệu khi kết thúc hợp đồng. Chi tiết trong chính sách và DPA khi ký enterprise.",
  },
] as const;

export function FAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-[#1A0F3E] px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#F4F2FF] sm:text-4xl">
            Câu hỏi thường gặp
          </h2>
          <p className="mt-3 text-muted-foreground">
            Những điều team hay hỏi trước khi chạy agent thật.
          </p>
        </div>
        <Accordion className="rounded-xl border border-[#C4B5FD]/35 bg-[#2D1B69]/50 px-2">
          {faqs.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="px-3 text-left text-[#F4F2FF] hover:text-primary hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-4 text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
