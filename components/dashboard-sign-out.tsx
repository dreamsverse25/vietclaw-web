"use client";

import { SignOutButton } from "@clerk/nextjs";

export function DashboardSignOut() {
  return (
    <SignOutButton>
      <button
        type="button"
        className="rounded-lg border-2 border-[#00d4ff] bg-[#00d4ff]/15 px-6 py-2.5 text-sm font-semibold text-[#00d4ff] transition-colors hover:bg-[#00d4ff]/25"
      >
        {"\u0110\u0103ng xu\u1EA5t"}
      </button>
    </SignOutButton>
  );
}
