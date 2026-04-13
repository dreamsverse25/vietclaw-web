import { NextResponse } from "next/server";

import { createServiceRoleClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

type Plan = "starter" | "pro" | "business";

const PLAN_AMOUNTS: Record<Plan, number> = {
  starter: 299_000,
  pro: 599_000,
  business: 2_299_000,
};

const VIRTUAL_ACCOUNT_BY_PLAN: Record<Plan, string> = {
  starter: "SEP10004VCSTARTER",
  pro: "SEP10004VCPRO",
  business: "SEP10004VCBUSINESS",
};

function isPlan(v: unknown): v is Plan {
  return v === "starter" || v === "pro" || v === "business";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Payload kh\u00f4ng h\u1ee3p l\u1ec7" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const plan = body.plan;

  if (!name || !email || !phone || !isPlan(plan)) {
    return NextResponse.json(
      {
        error:
          "Thi\u1ebfu ho\u1eb7c sai th\u00f4ng tin b\u1eaft bu\u1ed9c (h\u1ecdc t\u00ean, email, S\u0110T, g\u00f3i).",
      },
      { status: 400 },
    );
  }

  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Ch\u01b0a c\u1ea5u h\u00ecnh Supabase (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
      },
      { status: 500 },
    );
  }

  const { data: existing, error: findErr } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("email", email)
    .limit(1)
    .maybeSingle();

  if (findErr) {
    console.error("[register] find subscription by email", findErr);
    return NextResponse.json(
      {
        error: "Kh\u00f4ng th\u1ec3 ki\u1ec3m tra \u0111\u0103ng k\u00fd. Th\u1eed l\u1ea1i sau.",
      },
      { status: 500 },
    );
  }

  if (existing) {
    return NextResponse.json({ exists: true, message: "Email đã đăng ký" }, { status: 200 });
  }

  const amount = PLAN_AMOUNTS[plan];
  const paymentCode = `VIETCLAW ${email}`;

  const { error: insErr } = await supabase.from("subscriptions").insert({
    name,
    email,
    phone,
    plan,
    status: "pending",
    amount,
    payment_code: paymentCode,
    virtual_account: VIRTUAL_ACCOUNT_BY_PLAN[plan],
  });

  if (insErr) {
    console.error("[register] insert subscription", insErr);
    return NextResponse.json(
      { error: "Kh\u00f4ng th\u1ec3 l\u01b0u \u0111\u0103ng k\u00fd." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, paymentCode, amount }, { status: 200 });
}
