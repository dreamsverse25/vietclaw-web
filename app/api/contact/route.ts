import { NextResponse } from "next/server";
import { Resend } from "resend";

import { createServiceRoleClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

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

function isCompanySize(v: string): v is (typeof COMPANY_SIZES)[number] {
  return (COMPANY_SIZES as readonly string[]).includes(v);
}

function isIndustry(v: string): v is (typeof INDUSTRIES)[number] {
  return (INDUSTRIES as readonly string[]).includes(v);
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
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const companySizeRaw = typeof body.company_size === "string" ? body.company_size.trim() : "";
  const industryRaw = typeof body.industry === "string" ? body.industry.trim() : "";
  const needs = typeof body.needs === "string" ? body.needs.trim() : "";
  const currentSoftwareRaw =
    typeof body.current_software === "string" ? body.current_software.trim() : "";

  if (!name || !email || !phone || !company) {
    return NextResponse.json(
      { error: "Vui lòng điền đủ họ tên, email, số điện thoại và tên công ty." },
      { status: 400 },
    );
  }

  if (!isCompanySize(companySizeRaw)) {
    return NextResponse.json({ error: "Quy mô công ty không hợp lệ." }, { status: 400 });
  }

  if (!isIndustry(industryRaw)) {
    return NextResponse.json({ error: "Ngành nghề không hợp lệ." }, { status: 400 });
  }

  if (!needs) {
    return NextResponse.json({ error: "Vui lòng mô tả nhu cầu." }, { status: 400 });
  }

  if (needs.length > 1000) {
    return NextResponse.json({ error: "Mô tả nhu cầu tối đa 1000 ký tự." }, { status: 400 });
  }

  if (currentSoftwareRaw.length > 500) {
    return NextResponse.json(
      { error: "Phần mềm hiện tại tối đa 500 ký tự." },
      { status: 400 },
    );
  }

  const company_size = companySizeRaw;
  const industry = industryRaw;
  const current_software = currentSoftwareRaw || null;

  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Chưa cấu hình Supabase (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)." },
      { status: 500 },
    );
  }

  const { error: insErr } = await supabase.from("enterprise_leads").insert({
    name,
    email,
    phone,
    company,
    company_size,
    industry,
    needs,
    current_software,
  });

  if (insErr) {
    console.error("[contact] insert enterprise_leads", insErr);
    return NextResponse.json({ error: "Không thể lưu yêu cầu. Thử lại sau." }, { status: 500 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "VietClaw <noreply@vietclaw.net>";
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from,
        to: "admin@vietclaw.net",
        subject: `[VietClaw] Liên hệ Enterprise — ${email}`,
        html: `
          <h2>Liên hệ Enterprise</h2>
          <p><strong>Họ và tên:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>SĐT:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Công ty:</strong> ${escapeHtml(company)}</p>
          <p><strong>Quy mô:</strong> ${escapeHtml(company_size)}</p>
          <p><strong>Ngành:</strong> ${escapeHtml(industry)}</p>
          <p><strong>Nhu cầu:</strong></p>
          <p>${escapeHtml(needs).replace(/\n/g, "<br/>")}</p>
          <p><strong>Phần mềm hiện tại:</strong></p>
          <p>${current_software ? escapeHtml(current_software).replace(/\n/g, "<br/>") : "—"}</p>
        `,
      });
    } catch (e) {
      console.error("[contact] Resend", e);
    }
  }

  return NextResponse.json({ success: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
