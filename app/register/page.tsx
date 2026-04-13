"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
} from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Clipboard } from "lucide-react";

import { cn } from "@/lib/utils";

type PlanId = "starter" | "pro" | "business";

const PLANS: {
  id: PlanId;
  name: string;
  priceShort: string;
  amount: number;
  blurb: string;
}[] = [
  {
    id: "starter",
    name: "Starter",
    priceShort: "299k",
    amount: 299_000,
    blurb: "VPS 4GB / 2 vCPU, điều khiển qua Telegram.",
  },
  {
    id: "pro",
    name: "Pro",
    priceShort: "599k",
    amount: 599_000,
    blurb: "Tự động hóa nâng cao, kế toán AI, chăm sóc khách hàng.",
  },
  {
    id: "business",
    name: "Business",
    priceShort: "2.299k",
    amount: 2_299_000,
    blurb: "VPS mạnh, bundle AI và tích hợp đa kênh.",
  },
];

const VIRTUAL_ACCOUNTS: Record<PlanId, string> = {
  starter: "SEP100014VCSTARTER",
  pro: "SEP100014VCPRO",
  business: "SEP100014VCBUSINESS",
};

function resolveSelectedPlan(planFromURL: string | null): PlanId {
  if (planFromURL === "starter") return "starter";
  if (planFromURL === "business") return "business";
  return "pro";
}

function formatMoney(n: number) {
  return `${n.toLocaleString("vi-VN")}đ`;
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const signUpLegacyRedirect = { afterSignUpUrl: "/dashboard" } as const satisfies Record<string, string>;

function RegisterInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planFromURL = searchParams.get("plan");
  const [plan, setPlan] = useState<PlanId>(() => resolveSelectedPlan(planFromURL));

  useEffect(() => {
    setPlan(resolveSelectedPlan(planFromURL));
  }, [planFromURL]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [toast, setToast] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const selected = useMemo(
    () => PLANS.find((p) => p.id === plan) ?? PLANS[1],
    [plan],
  );

  const formValid =
    name.trim().length > 0 &&
    emailOk(email.trim()) &&
    phone.trim().length > 0;

  const transferContent = `VIETCLAW ${email.trim()}`;
  const qrSrc = useMemo(() => {
    const va = VIRTUAL_ACCOUNTS[plan];
    const params = new URLSearchParams({
      acc: va,
      bank: "Sacombank",
      amount: String(selected.amount),
      des: `VIETCLAW ${email.trim() || "email@example.com"}`,
    });
    return `https://qr.sepay.vn/img?${params.toString()}`;
  }, [plan, selected.amount, email]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const copyText = useCallback(
    (text: string) => {
      void navigator.clipboard.writeText(text).then(() => showToast("Đã copy!"));
    },
    [showToast],
  );

  const selectPlan = (id: PlanId) => {
    setPlan(id);
    router.replace(`/register?plan=${id}`, { scroll: false });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid || submitting) return;
    setSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim() || null,
          plan,
          message: message.trim() || null,
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
        setApiError("Không xác nhận được đăng ký.");
      }
    } catch {
      setApiError("Không kết nối được máy chủ. Thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100">
      {toast ? (
        <div
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-[#00d4ff]/40 bg-[#111] px-4 py-2 text-sm text-[#00d4ff] shadow-lg"
          role="status"
        >
          {toast}
        </div>
      ) : null}

      <header className="border-b border-white/10 bg-[#111]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-[#00d4ff]"
          >
            ← Về trang chủ
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#00d4ff]">
            VietClaw
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-center font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Đăng ký dịch vụ
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-neutral-400 sm:text-base">
          Chọn gói, điền thông tin và hoàn tất thanh toán chuyển khoản.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Cột trái: tóm tắt gói */}
          <aside className="space-y-6">
            <section className="rounded-xl border border-white/10 bg-[#111] p-5 ring-1 ring-white/5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#00d4ff]">
                Gói đã chọn
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">{selected.name}</h2>
              <p className="mt-1 text-2xl font-bold text-[#00d4ff]">
                {formatMoney(selected.amount)}
                <span className="text-base font-normal text-neutral-500">/tháng</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{selected.blurb}</p>
            </section>

            <div className="rounded-xl border border-dashed border-white/15 bg-[#0d1117]/50 p-4 text-sm text-neutral-500">
              Cần tư vấn thêm?{" "}
              <a
                href="mailto:contact@vietclaw.net"
                className="font-medium text-[#00d4ff] hover:underline"
              >
                contact@vietclaw.net
              </a>
            </div>
          </aside>

          {/* Cột phải: bước 1–3 + form */}
          <div className="space-y-8">
            {!success ? (
              <form onSubmit={onSubmit} className="space-y-8">
                {/* Bước 1 */}
                <section>
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Bước 1 — Chọn gói
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {PLANS.map((p) => {
                      const active = plan === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => selectPlan(p.id)}
                          className={cn(
                            "rounded-lg border px-3 py-3 text-left transition-colors",
                            active
                              ? "border-[#00d4ff] bg-[#111] shadow-[0_0_0_1px_rgba(0,212,255,0.2)]"
                              : "border-[#333] bg-[#0a0a0a] hover:border-white/20",
                          )}
                        >
                          <p className="text-sm font-semibold text-white">{p.name}</p>
                          <p className="mt-1 text-lg font-bold text-[#00d4ff]">{p.priceShort}</p>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Bước 2 */}
                <section>
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Bước 2 — Thông tin liên hệ
                  </p>
                  <div className="mt-3 space-y-4">
                    <div>
                      <label className="text-sm text-neutral-300" htmlFor="name">
                        Họ và tên <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2.5 text-sm text-white outline-none ring-0 transition-[border-color,box-shadow] placeholder:text-neutral-600 focus:border-[#00d4ff] focus:shadow-[0_0_0_1px_rgba(0,212,255,0.35)]"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-neutral-300" htmlFor="email">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        required
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00d4ff] focus:shadow-[0_0_0_1px_rgba(0,212,255,0.35)]"
                        placeholder="ban@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-neutral-300" htmlFor="phone">
                        Số điện thoại <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="phone"
                        required
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00d4ff] focus:shadow-[0_0_0_1px_rgba(0,212,255,0.35)]"
                        placeholder="0901 234 567"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-neutral-300" htmlFor="company">
                        Tên doanh nghiệp <span className="text-neutral-500">(tuỳ chọn)</span>
                      </label>
                      <input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00d4ff] focus:shadow-[0_0_0_1px_rgba(0,212,255,0.35)]"
                        placeholder="Công ty TNHH ..."
                      />
                    </div>
                    <div>
                      <label className="text-sm text-neutral-300" htmlFor="message">
                        Bạn muốn dùng bot để làm gì?{" "}
                        <span className="text-neutral-500">(tuỳ chọn, tối đa 300 ký tự)</span>
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        maxLength={300}
                        rows={4}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1.5 w-full resize-y rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00d4ff] focus:shadow-[0_0_0_1px_rgba(0,212,255,0.35)]"
                        placeholder="Mô tả ngắn nhu cầu của bạn..."
                      />
                      <p className="mt-1 text-right text-xs text-neutral-500">
                        {message.length}/300
                      </p>
                    </div>
                  </div>
                </section>

                {apiError ? (
                  <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                    {apiError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={!formValid || submitting}
                  className={cn(
                    "w-full rounded-lg py-3 text-center text-base font-semibold transition-colors",
                    formValid
                      ? "bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#33ddff] disabled:opacity-60"
                      : "cursor-not-allowed bg-neutral-700 text-neutral-400",
                  )}
                >
                  {submitting ? "Đang gửi..." : "Đăng ký"}
                </button>

                <p className="text-center text-xs text-neutral-500">
                  Đã có tài khoản?{" "}
                  <Link href="/login" className="font-medium text-[#00d4ff] hover:underline">
                    Đăng nhập
                  </Link>
                </p>
              </form>
            ) : (
              <div className="space-y-8">
                <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-300">
                  ✅ Thông tin đã được ghi nhận! Vui lòng hoàn tất thanh toán để kích hoạt ngay.
                </p>

                <section id="payment-section" className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Bước 3 — Thanh toán chuyển khoản
                  </p>

                  <div className="rounded-xl border border-[#00d4ff]/30 bg-[#0d1117] p-5">
                    <h3 className="text-center text-base font-semibold text-white">
                      Quét mã QR để thanh toán
                    </h3>
                    <div className="mt-4 flex justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={qrSrc}
                        alt="Mã QR thanh toán Sepay"
                        width={260}
                        height={260}
                        className="rounded-lg bg-white p-2"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#111] p-5">
                    <p className="text-sm font-medium text-neutral-300">
                      Hoặc chuyển khoản thủ công
                    </p>
                    <ul className="mt-4 space-y-3 text-sm">
                      <li className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-neutral-400">Ngân hàng:</span>
                        <span className="text-white">Sacombank</span>
                      </li>
                      <li className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-neutral-400">Số TK:</span>
                        <span className="flex items-center gap-2 font-mono text-white">
                          {VIRTUAL_ACCOUNTS[plan]}
                          <button
                            type="button"
                            onClick={() => copyText(VIRTUAL_ACCOUNTS[plan])}
                            className="inline-flex rounded-md border border-[#333] p-1.5 text-[#00d4ff] transition-colors hover:bg-white/5"
                            aria-label="Sao chép số tài khoản"
                          >
                            <Clipboard className="size-4" />
                          </button>
                        </span>
                      </li>
                      <li className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-neutral-400">Chủ TK:</span>
                        <span className="flex items-center gap-2 text-white">
                          NGUYEN THI HOANG ANH
                          <button
                            type="button"
                            onClick={() => copyText("NGUYEN THI HOANG ANH")}
                            className="inline-flex rounded-md border border-[#333] p-1.5 text-[#00d4ff] transition-colors hover:bg-white/5"
                            aria-label="Sao chép tên chủ tài khoản"
                          >
                            <Clipboard className="size-4" />
                          </button>
                        </span>
                      </li>
                      <li className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-neutral-400">Số tiền:</span>
                        <span className="flex items-center gap-2 font-mono text-[#00d4ff]">
                          {formatMoney(selected.amount)}
                          <button
                            type="button"
                            onClick={() => copyText(String(selected.amount))}
                            className="inline-flex rounded-md border border-[#333] p-1.5 text-[#00d4ff] transition-colors hover:bg-white/5"
                            aria-label="Sao chép số tiền"
                          >
                            <Clipboard className="size-4" />
                          </button>
                        </span>
                      </li>
                      <li className="flex flex-wrap items-start justify-between gap-2">
                        <span className="text-neutral-400">Nội dung:</span>
                        <span className="flex max-w-[min(100%,18rem)] items-start gap-2 text-right font-mono text-sm text-white break-all">
                          {transferContent}
                          <button
                            type="button"
                            onClick={() => copyText(transferContent)}
                            className="inline-flex shrink-0 rounded-md border border-[#333] p-1.5 text-[#00d4ff] transition-colors hover:bg-white/5"
                            aria-label="Sao chép nội dung chuyển khoản"
                          >
                            <Clipboard className="size-4" />
                          </button>
                        </span>
                      </li>
                    </ul>
                  </div>

                  <p className="rounded-lg border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-3 py-2 text-xs leading-relaxed text-neutral-300">
                    Tài khoản sẽ được kích hoạt tự động ngay sau khi nhận được thanh toán.
                  </p>
                </section>

                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("payment-section")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                  className="w-full rounded-lg bg-[#00d4ff] py-3 text-center text-base font-semibold text-[#0a0a0a] transition-colors hover:bg-[#33ddff]"
                >
                  Tiếp tục thanh toán →
                </button>

                <p className="text-center text-xs text-neutral-500">
                  Đã có tài khoản?{" "}
                  <Link href="/login" className="font-medium text-[#00d4ff] hover:underline">
                    Đăng nhập
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="hidden" aria-hidden>
        <SignUp
          {...(signUpLegacyRedirect as unknown as ComponentProps<typeof SignUp>)}
          appearance={{
            baseTheme: dark,
            variables: { colorPrimary: "#00D4FF" },
          }}
          routing="path"
          path="/register"
          signInUrl="/login"
        />
      </div>
    </div>
  );
}

function RegisterFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-neutral-400">
      Đang tải...
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterFallback />}>
      <RegisterInner />
    </Suspense>
  );
}
