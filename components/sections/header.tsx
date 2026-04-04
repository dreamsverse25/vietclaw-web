import Link from "next/link";

const nav = [
  { href: "#features", label: "Tính năng" },
  { href: "#pricing", label: "Bảng giá" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#C4B5FD]/25 bg-[#2D1B69]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="#"
          className="flex h-full shrink-0 items-center leading-none"
          aria-label="VietClaw — Trang chủ"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="VietClaw"
            className="object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
            style={{ height: 48, width: "auto" }}
          />
        </Link>
        <nav className="hidden h-full items-center gap-8 text-sm font-medium sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="#pricing"
          className="flex h-full items-center text-sm font-medium text-primary hover:underline"
        >
          Dùng thử
        </Link>
      </div>
    </header>
  );
}
