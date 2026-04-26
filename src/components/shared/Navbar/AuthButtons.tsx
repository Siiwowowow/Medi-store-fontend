import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";

interface Props {
  onLinkClick?: () => void;
  orientation?: "horizontal" | "vertical";
}

export default function AuthButtons({ onLinkClick, orientation = "horizontal" }: Props) {
  return (
    <div className={`flex gap-2 ${orientation === "vertical" ? "flex-col" : "items-center"}`}>
      <Link
        href="/login"
        onClick={onLinkClick}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white border border-white/30 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 whitespace-nowrap"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        <LogIn className="w-3.5 h-3.5" />
        Login
      </Link>

      <Link
        href="/register"
        onClick={onLinkClick}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-shop_orange rounded-lg hover:bg-[#e05e06] transition-all duration-200 whitespace-nowrap shadow-[0_4px_14px_rgba(251,108,8,0.3)]"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        <UserPlus className="w-3.5 h-3.5" />
        Sign Up
      </Link>
    </div>
  );
}