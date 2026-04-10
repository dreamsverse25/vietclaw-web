import { SignUp } from "@clerk/nextjs";

import { clerkDarkAppearance } from "@/lib/clerk-appearance";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#2D1B69] px-4 py-12">
      <p className="mb-8 text-center text-xl font-semibold tracking-tight text-[#F4F2FF] sm:text-2xl">
        Tạo tài khoản VietClaw
      </p>
      <SignUp
        appearance={clerkDarkAppearance}
        routing="path"
        path="/register"
        signInUrl="/login"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}
