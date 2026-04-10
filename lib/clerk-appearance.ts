/** Dark theme aligned with VietClaw landing (purple + cyan). */
export const clerkDarkAppearance = {
  variables: {
    colorPrimary: "#00d4ff",
    colorBackground: "#1a0f3e",
    colorText: "#f4f2ff",
    colorTextSecondary: "#c4b5fd",
    colorInputBackground: "#2d1b69",
    colorInputText: "#f4f2ff",
    colorNeutral: "#c4b5fd",
    borderRadius: "0.625rem",
  },
  elements: {
    card: "border border-[#C4B5FD]/35 shadow-lg",
    headerTitle: "text-[#F4F2FF]",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton:
      "border border-[#C4B5FD]/35 bg-[#2D1B69]/60 text-[#F4F2FF]",
    formButtonPrimary:
      "bg-[#00d4ff] text-[#1a0f3e] hover:brightness-110 shadow-md",
    formFieldInput: "border-[#C4B5FD]/35 bg-[#2D1B69] text-[#F4F2FF]",
    footerActionLink: "text-[#00d4ff] hover:text-[#00d4ff]/90",
    identityPreviewText: "text-[#F4F2FF]",
    identityPreviewEditButtonIcon: "text-[#00d4ff]",
  },
} as const;
