"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export type DashboardSubscription = {
  plan: string;
  status: string;
  end_date: string | null;
} | null;

export type DashboardBotConfig = {
  telegram_username: string | null;
  bot_status: string | null;
} | null;

const PLAN_LABELS: Record<string, string> = {
  starter: "C\u01a1 b\u1ea3n",
  pro: "Pro",
  business: "Business",
  agency: "Agency",
};

const SUB_STATUS_LABELS: Record<string, string> = {
  active: "\u0110ang ho\u1ea1t \u0111\u1ed9ng",
  pending: "Ch\u1edd x\u1eed l\u00fd",
  expired: "H\u1ebft h\u1ea1n",
  cancelled: "\u0111\u00e3 h\u1ee7y",
};

const UI = {
  emDash: "\u2014",
  ellipsis: "\u2026",
  signOut: "\u0110\u0103ng xu\u1ea5t",
  greet: (name: string) => `Xin ch\xe0o, ${name}`,
  guest: "b\u1ea1n",
  supabaseWarnBefore:
    "Thi\u1ebfu c\u1ea5u h\xecnh Supabase: th\xeam ",
  supabaseWarnAfter:
    " v\xe0o .env.local (server) c\xf9ng URL/anon \u0111\u1ec3 t\u1ea3i g\xf3i v\xe0 bot.",
  noPlanBanner:
    "B\u1ea1n ch\u01b0a c\xf3 g\xf3i n\xe0o \u2014 \u0111\u0103ng k\xfd ngay \u0111\u1ec3 k\xedch ho\u1ea1t \u0111\u1ea7y \u0111\u1ee7 t\xednh n\u0103ng.",
  viewPricing: "Xem b\u1ea3ng gi\xe1",
  subTitle: "G\xf3i \u0111\u0103ng k\xfd",
  subSubtitle: "D\u1eef li\u1ec7u t\u1eeb Supabase",
  planCurrent: "G\xf3i hi\u1ec7n t\u1ea1i",
  planEnd: "Ng\xe0y h\u1ebft h\u1ea1n",
  planStatus: "Tr\u1ea1ng th\xe1i g\xf3i",
  planActive: "Ho\u1ea1t \u0111\u1ed9ng",
  activeYes: "Ho\u1ea1t \u0111\u1ed9ng",
  activeNo: "Kh\xf4ng ho\u1ea1t \u0111\u1ed9ng",
  botTitle: "Bot Telegram",
  botSubtitle: "Tr\u1ea1ng th\xe1i v\xe0 li\xean k\u1ebft",
  botState: "Tr\u1ea1ng th\xe1i",
  botOn: "\u0110ang b\u1eadt",
  botOff: "Ch\u01b0a b\u1eadt",
  botLink: "Li\xean k\u1ebft bot",
  botUnset: "Ch\u01b0a c\u1ea5u h\xecnh",
  quickTitle: "Thao t\xe1c nhanh",
  quickDocs: "Xem h\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t",
  quickUpgrade: "N\xe2ng c\u1ea5p g\xf3i",
  quickSupport: "Li\xean h\u1ec7 h\u1ed7 tr\u1ee3",
} as const;

function formatDate(iso: string | null) {
  if (!iso) return UI.emDash;
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return UI.emDash;
  }
}

function subscriptionIsActive(status: string) {
  return status === "active";
}

type Props = {
  subscription: DashboardSubscription;
  botConfig: DashboardBotConfig;
  hasUserRow: boolean;
  supportTelegramUrl: string;
  supabaseConfigured: boolean;
};

export function DashboardUi({
  subscription,
  botConfig,
  hasUserRow,
  supportTelegramUrl,
  supabaseConfigured,
}: Props) {
  const { user, isLoaded } = useUser();
  const headerName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress ||
    UI.guest;

  const hasSubscription = !!subscription;
  const showNoPlanBanner = hasUserRow && !hasSubscription;
  const planLabel = subscription
    ? (PLAN_LABELS[subscription.plan] ?? subscription.plan)
    : UI.emDash;
  const statusLabel = subscription
    ? (SUB_STATUS_LABELS[subscription.status] ?? subscription.status)
    : UI.emDash;
  const activeLabel = subscription
    ? subscriptionIsActive(subscription.status)
      ? UI.activeYes
      : UI.activeNo
    : UI.emDash;

  const botActive =
    (botConfig?.bot_status ?? "").toLowerCase() === "active";
  const telegramUser = botConfig?.telegram_username?.replace(/^@/, "") ?? "";
  const telegramBotUrl = telegramUser
    ? `https://t.me/${telegramUser}`
    : null;

  return (
    <div className="min-h-screen bg-[#2D1B69] text-[#F4F2FF]">
      <header className="border-b border-[#C4B5FD]/25 bg-[#1A0F3E]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              VietClaw
            </p>
            <p className="truncate text-sm text-muted-foreground sm:text-base">
              {!isLoaded ? UI.ellipsis : UI.greet(headerName)}
            </p>
          </div>
          <SignOutButton>
            <button
              type="button"
              className="rounded-lg border-2 border-[#00d4ff] bg-[#00d4ff]/15 px-4 py-2 text-sm font-semibold text-[#00d4ff] transition-colors hover:bg-[#00d4ff]/25"
            >
              {UI.signOut}
            </button>
          </SignOutButton>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        {!supabaseConfigured ? (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            {UI.supabaseWarnBefore}
            <code className="mx-1 rounded bg-black/20 px-1">
              SUPABASE_SERVICE_ROLE_KEY
            </code>
            {UI.supabaseWarnAfter}
          </div>
        ) : null}

        {showNoPlanBanner ? (
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/40 bg-primary/10 px-4 py-4 sm:flex-row sm:items-center">
            <p className="text-sm font-medium text-[#F4F2FF] sm:text-base">
              {UI.noPlanBanner}
            </p>
            <Link
              href="/pricing"
              className="shrink-0 rounded-lg bg-[#00d4ff] px-4 py-2 text-sm font-semibold text-[#1a0f3e] transition hover:brightness-110"
            >
              {UI.viewPricing}
            </Link>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border border-[#C4B5FD]/35 bg-[#1A0F3E]/90 p-5 shadow-none">
            <h2 className="font-heading text-lg font-semibold text-[#F4F2FF]">
              {UI.subTitle}
            </h2>
            <p className="mt-1 text-sm text-[#c4b5fd]">{UI.subSubtitle}</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-[#C4B5FD]/20 pb-2">
                <dt className="text-[#c4b5fd]">{UI.planCurrent}</dt>
                <dd className="font-medium text-primary">{planLabel}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#C4B5FD]/20 pb-2">
                <dt className="text-[#c4b5fd]">{UI.planEnd}</dt>
                <dd className="font-medium">
                  {formatDate(subscription?.end_date ?? null)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#C4B5FD]/20 pb-2">
                <dt className="text-[#c4b5fd]">{UI.planStatus}</dt>
                <dd className="font-medium">{statusLabel}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#c4b5fd]">{UI.planActive}</dt>
                <dd>
                  <span
                    className={
                      subscription && subscriptionIsActive(subscription.status)
                        ? "rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-300"
                        : "rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-[#c4b5fd]"
                    }
                  >
                    {activeLabel}
                  </span>
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-[#C4B5FD]/35 bg-[#1A0F3E]/90 p-5 shadow-none">
            <h2 className="font-heading text-lg font-semibold text-[#F4F2FF]">
              {UI.botTitle}
            </h2>
            <p className="mt-1 text-sm text-[#c4b5fd]">{UI.botSubtitle}</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-[#C4B5FD]/20 pb-2">
                <span className="text-[#c4b5fd]">{UI.botState}</span>
                <span
                  className={
                    botActive
                      ? "font-medium text-emerald-300"
                      : "font-medium text-[#c4b5fd]"
                  }
                >
                  {botActive ? UI.botOn : UI.botOff}
                </span>
              </div>
              <div>
                <p className="text-[#c4b5fd]">{UI.botLink}</p>
                {telegramBotUrl ? (
                  <a
                    href={telegramBotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block break-all text-primary underline-offset-2 hover:underline"
                  >
                    {telegramBotUrl}
                  </a>
                ) : (
                  <p className="mt-1 text-[#c4b5fd]">{UI.botUnset}</p>
                )}
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-xl border border-[#C4B5FD]/35 bg-[#1A0F3E]/60 p-5">
          <h2 className="font-heading text-lg font-semibold text-[#F4F2FF]">
            {UI.quickTitle}
          </h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-lg border border-[#C4B5FD]/40 bg-[#2D1B69]/60 px-4 py-2.5 text-sm font-medium text-[#F4F2FF] transition hover:border-primary/50 hover:text-primary"
            >
              {UI.quickDocs}
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg border border-[#C4B5FD]/40 bg-[#2D1B69]/60 px-4 py-2.5 text-sm font-medium text-[#F4F2FF] transition hover:border-primary/50 hover:text-primary"
            >
              {UI.quickUpgrade}
            </Link>
            <a
              href={supportTelegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-[#C4B5FD]/40 bg-[#2D1B69]/60 px-4 py-2.5 text-sm font-medium text-[#F4F2FF] transition hover:border-primary/50 hover:text-primary"
            >
              {UI.quickSupport}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
