import Link from "next/link";

const links = [
  { href: "#features", label: "Về chúng tôi" },
  { href: "#features", label: "Tính năng" },
  { href: "#pricing", label: "Bảng giá" },
  { href: "#faq", label: "FAQ" },
  { href: "mailto:hello@vietclaw.net", label: "Liên hệ" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[#C4B5FD]/25 bg-[#1A0F3E] px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="#" className="inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="VietClaw"
              height={28}
              className="h-7 w-auto"
            />
          </Link>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            AI Agent chạy ngay — không cần kỹ thuật.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {links.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href="mailto:hello@vietclaw.net"
            className="text-sm font-medium text-primary hover:underline"
          >
            hello@vietclaw.net
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-center text-xs text-muted-foreground sm:text-left">
        © {new Date().getFullYear()} VietClaw. All rights reserved.
      </p>
    </footer>
  );
}
