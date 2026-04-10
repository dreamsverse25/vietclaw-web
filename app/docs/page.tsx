import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#2D1B69] px-4 text-center text-[#F4F2FF]">
      <h1 className="font-heading text-2xl font-bold">Tài liệu VietClaw</h1>
      <p className="mt-3 max-w-md text-sm text-[#c4b5fd]">
        Trang hư��ng d��n đang được biên soạn. Quay lại trang ch�� hoặc liên hệ
        h�� tr�� nếu cần gấp.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#00d4ff] px-5 py-2 text-sm font-semibold text-[#1a0f3e] hover:brightness-110"
      >
        Về trang ch��
      </Link>
    </div>
  );
}
