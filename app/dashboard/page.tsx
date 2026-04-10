import { currentUser } from "@clerk/nextjs/server";

import { DashboardSignOut } from "@/components/dashboard-sign-out";

export default async function DashboardPage() {
  const user = await currentUser();
  const displayName =
    user?.firstName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    "b\u1ea1n";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#2D1B69] px-4">
      <p className="max-w-md text-center text-lg text-[#F4F2FF] sm:text-xl">
        {`Ch\u00e0o m\u1eebng ${displayName}! Dashboard \u0111ang \u0111\u01b0\u1ee3c x\u00e2y d\u1ef1ng.`}
      </p>
      <div className="mt-8">
        <DashboardSignOut />
      </div>
    </div>
  );
}
