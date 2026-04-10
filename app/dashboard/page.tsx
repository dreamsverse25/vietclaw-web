import { currentUser } from "@clerk/nextjs/server";

import {
  DashboardUi,
  type DashboardBotConfig,
  type DashboardSubscription,
} from "./_components/dashboard-ui";
import { createServiceRoleClient } from "@/lib/supabase/service";

const DEFAULT_SUPPORT = "https://t.me/vietclaw_support";

export default async function DashboardPage() {
  const user = await currentUser();
  const clerkId = user?.id ?? null;

  const supabase = createServiceRoleClient();
  const supabaseConfigured = !!supabase;

  let subscription: DashboardSubscription = null;
  let botConfig: DashboardBotConfig = null;
  let hasUserRow = false;

  if (supabase && clerkId) {
    const { data: dbUser } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerkId)
      .maybeSingle();

    if (dbUser?.id) {
      hasUserRow = true;

      const { data: subRow } = await supabase
        .from("subscriptions")
        .select("plan, status, end_date")
        .eq("user_id", dbUser.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      subscription = subRow ?? null;

      const { data: botRow } = await supabase
        .from("bot_configs")
        .select("telegram_username, bot_status")
        .eq("user_id", dbUser.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      botConfig = botRow ?? null;
    }
  }

  const supportTelegramUrl =
    process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT_URL ?? DEFAULT_SUPPORT;

  return (
    <DashboardUi
      subscription={subscription}
      botConfig={botConfig}
      hasUserRow={hasUserRow}
      supportTelegramUrl={supportTelegramUrl}
      supabaseConfigured={supabaseConfigured}
    />
  );
}
