import { redirect } from "next/navigation";

/**�iểm vào /pricing: chuyển về landing phần bảng giá */
export default function PricingRoutePage() {
  redirect("/#pricing");
}
