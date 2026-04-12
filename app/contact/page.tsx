"use client";

import { useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const COMPANY_SIZES = [
  "Dưới 10 người",
  "10-50 người",
  "50-200 người",
  "Trên 200 người",
] as const;

const INDUSTRIES = [
  "Thương mại điện tử",
  "Bất động sản",
  "Tài chính",
  "Sản xuất",
  "Dịch vụ",
  "Công nghệ",
  "Khác",
] as const;

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const inputClass =
  "mt-1.5 w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2.5 text-sm text-white outline-none transition-[border-color,box-shadow] placeholder:text-neutral-600 focus:border-[#00d4ff] focus:shadow-[0_0_0_1px_rgba(0,212,255,0.35)]";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [needs, setNeeds] = useState("");
  const [currentSoftware, setCurrentSoftware] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formValid =
    name.trim().length > 0 &&
    emailOk(email.trim()) &&
    phone.trim().length > 0 &&
    company.trim().length > 0 &&
    companySize.length > 0 &&
    industry.length > 0 &&
    needs.trim().length > 0 &&
    needs.length <= 1000 &&
    currentSoftware.length <= 500;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid || submitting) return;
    setSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          company_size: companySize,
          industry,
          needs: needs.trim(),
          current_software: currentSoftware.trim() || null,
        }),
      });
      const data = (await res.json()) as { error?: string; success?: boolean };
      if (!res.ok) {
        setApiError(data.error ?? "Có lỗi xảy ra.");
        return;
      }
      if (data.success === true) {
        setSuccess(true);
      } else {
        setApiError("Không xác nhận được yêu cầu.");
      }
    } catch {
      setApiError("Không kết nối được máy chủ. Thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100">
      <header className="border-b border-white/10 bg-[#111]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/pricing"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-[#00d4ff]"
          >
            ← Quay lại
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#00d4ff]">
            VietClaw
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Cột trái */}
          <div className="space-y-6">
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0a0a0a]"
              style={{ backgroundColor: "#FFD700" }}
            >
              Enterprise Plan
            </span>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Hãy cho chúng tôi biết nhu cầu của bạn
            </h1>
            <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
              Chúng tôi sẽ liên hệ lại trong 2-3 ngày làm việc để tư vấn giải pháp phù hợp nhất cho
              doanh nghiệp của bạn.
            </p>
            <ul className="space-y-2 text-sm text-neutral-300 sm:text-base">
              <li>• Hạ tầng VPS tùy chỉnh, không giới hạn bot</li>
              <li>• Tích hợp ERP/CRM/phần mềm nội bộ</li>
              <li>• SLA uptime 99.9%</li>
              <li>• Đội kỹ thuật hỗ trợ riêng</li>
              <li>• Custom model &amp; workflow theo ngành</li>
            </ul>
            <div className="space-y-2 border-t border-white/10 pt-6 text-sm text-neutral-300">
              <p>
                <span className="mr-2" aria-hidden>
                  📧
                </span>
                <a
                  href="mailto:contact@vietclaw.net"
                  className="font-medium text-[#00d4ff] hover:underline"
                >
                  contact@vietclaw.net
                </a>
              </p>
              <p>
                <span className="mr-2" aria-hidden>
                  💬
                </span>
                Telegram:{" "}
                <a
                  href="https://t.me/vietclawai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#00d4ff] hover:underline"
                >
                  @vietclawai
                </a>
              </p>
            </div>
          </div>

          {/* Cột phải */}
          <div>
            {success ? (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-6 text-sm leading-relaxed text-emerald-200 sm:px-6 sm:text-base">
                ✅ Yêu cầu đã được gửi thành công!
                <br />
                Đội ngũ VietClaw sẽ liên hệ với bạn trong 2-3 ngày làm việc qua email hoặc điện
                thoại.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label className="text-sm text-neutral-300" htmlFor="contact-name">
                    Họ và tên <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-300" htmlFor="contact-email">
                    Email doanh nghiệp <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-300" htmlFor="contact-phone">
                    Số điện thoại <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    required
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-300" htmlFor="contact-company">
                    Tên công ty <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-company"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-300" htmlFor="contact-size">
                    Quy mô công ty <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="contact-size"
                    required
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className={cn(inputClass, "cursor-pointer appearance-none bg-[#1a1a1a]")}
                  >
                    <option value="" disabled>
                      Chọn quy mô
                    </option>
                    {COMPANY_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-neutral-300" htmlFor="contact-industry">
                    Ngành nghề <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="contact-industry"
                    required
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className={cn(inputClass, "cursor-pointer appearance-none bg-[#1a1a1a]")}
                  >
                    <option value="" disabled>
                      Chọn ngành
                    </option>
                    {INDUSTRIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-neutral-300" htmlFor="contact-needs">
                    Mô tả nhu cầu của bạn <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-needs"
                    required
                    value={needs}
                    maxLength={1000}
                    rows={5}
                    onChange={(e) => setNeeds(e.target.value)}
                    className={cn(inputClass, "resize-y")}
                  />
                  <p className="mt-1 text-right text-xs text-neutral-500">{needs.length}/1000</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-300" htmlFor="contact-software">
                    Phần mềm hiện tại đang dùng?{" "}
                    <span className="text-neutral-500">(tuỳ chọn, tối đa 500 ký tự)</span>
                  </label>
                  <textarea
                    id="contact-software"
                    value={currentSoftware}
                    maxLength={500}
                    rows={3}
                    onChange={(e) => setCurrentSoftware(e.target.value)}
                    className={cn(inputClass, "resize-y")}
                  />
                  <p className="mt-1 text-right text-xs text-neutral-500">
                    {currentSoftware.length}/500
                  </p>
                </div>

                {apiError ? (
                  <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                    {apiError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={!formValid || submitting}
                  className={cn(
                    "w-full rounded-lg bg-[#00d4ff] py-3 text-center text-base font-semibold text-[#0a0a0a] transition-colors hover:bg-[#33ddff] disabled:cursor-not-allowed disabled:opacity-60",
                  )}
                >
                  {submitting ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
