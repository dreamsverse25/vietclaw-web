import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { ComponentProps } from "react";

const signInLegacyRedirects = {
  afterSignInUrl: "/dashboard",
  redirectUrl: "/dashboard",
} as const satisfies Record<string, string>;

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#2D1B69] px-4 py-12">
      <p className="mb-8 text-center text-xl font-semibold tracking-tight text-[#F4F2FF] sm:text-2xl">
        {"\u0110\u0103ng nh\u1EADp v\u00E0o VietClaw"}
      </p>
      <SignIn
        {...(signInLegacyRedirects as unknown as ComponentProps<typeof SignIn>)}
        appearance={{
          baseTheme: dark,
          variables: { colorPrimary: "#00D4FF" },
        }}
        routing="path"
        path="/login"
        signUpUrl="/register"
      />
    </div>
  );
}
