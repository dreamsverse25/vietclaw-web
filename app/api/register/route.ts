import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { createServiceRoleClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

type Plan = "starter" | "pro" | "business";

const PLAN_AMOUNTS: Record<Plan, number> = {
  starter: 299_000,
  pro: 599_000,
  business: 2_299_000,
};

function isPlan(v: unknown): v is Plan {
  return v === "starter" || v === "pro" || v === "business";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Payload không hợp lệ" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const company =
    typeof body.company === "string" && body.company.trim() ? body.company.trim() : null;
  const message =
    typeof body.message === "string" && body.message.trim() ? body.message.trim() : null;
  const plan = body.plan;

  if (!name || !email || !phone || !isPlan(plan)) {
    return NextResponse.json(
      { error: "Thiếu hoặc sai thông tin bắt buộc (họ tên, email, SĐT, gói)." },
      { status: 400 },
    );
  }

  const amount = PLAN_AMOUNTS[plan];
  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Chưa cấu hình Supabase (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)." },
      { status: 500 },
    );
  }

  const { data: existing, error: findErr } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (findErr) {
    console.error("[register] find user", findErr);
    return NextResponse.json({ error: "Không thể lưu đăng ký. Thử lại sau." }, { status: 500 });
  }

  let userId: string;

  if (existing?.id) {
    userId = existing.id;
    const { error: updErr } = await supabase
      .from("users")
      .update({
        full_name: name,
        phone,
        shop_name: company,
        registration_message: message,
      })
      .eq("id", userId);

    if (updErr) {
      console.error("[register] update user", updErr);
      return NextResponse.json({ error: "Không thể cập nhật thông tin." }, { status: 500 });
    }
  } else {
    const clerk_id = `pending_${randomUUID()}`;
    const { data: inserted, error: insErr } = await supabase
      .from("users")
      .insert({
        clerk_id,
        email,
        full_name: name,
        phone,
        shop_name: company,
        registration_message: message,
      })
      .select("id")
      .single();

    if (insErr || !inserted?.id) {
      console.error("[register] insert user", insErr);
      return NextResponse.json({ error: "Không thể tạo bản ghi người dùng." }, { status: 500 });
    }
    userId = inserted.id;
  }

  const { error: subErr } = await supabase.from("subscriptions").insert({
    user_id: userId,
    plan,
    status: "pending",
    amount,
  });

  if (subErr) {
    console.error("[register] insert subscription", subErr);
    return NextResponse.json({ error: "Không thể lưu gói đăng ký." }, { status: 500 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "VietClaw <noreply@vietclaw.net>";
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from,
        to: "admin@vietclaw.net",
        subject: `[VietClaw] Đăng ký mới — ${plan.toUpperCase()} — ${email}`,
        html: `
          <h2>Đăng ký mới</h2>
          <p><strong>Họ tên:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>SĐT:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Doanh nghiệp:</strong> ${company ? escapeHtml(company) : "—"}</p>
          <p><strong>Gói:</strong> ${escapeHtml(plan)}</p>
          <p><strong>Số tiền:</strong> ${amount.toLocaleString("vi-VN")}đ</p>
          <p><strong>Nhu cầu:</strong></p>
          <p>${message ? escapeHtml(message).replace(/\n/g, "<br/>") : "—"}</p>
        `,
      });
    } catch (e) {
      console.error("[register] Resend", e);
    }
  }

  return NextResponse.json({ success: true, userId });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
