import { SignIn } from "@clerk/nextjs";

import { clerkDarkAppearance } from "@/lib/clerk-appearance";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#2D1B69] px-4 py-12">
      <p className="mb-8 text-center text-xl font-semibold tracking-tight text-[#F4F2FF] sm:text-2xl">
        {"\u0110\u0103ng nh\u1EADp v\u00E0o VietClaw"}
      </p>
      <SignIn
        appearance={clerkDarkAppearance}
        routing="path"
        path="/login"
        signUpUrl="/register"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}
