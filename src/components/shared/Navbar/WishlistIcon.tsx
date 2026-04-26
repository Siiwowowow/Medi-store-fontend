"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistIcon({ count = 0 }: { count?: number }) {
  return (
    <Link
      href="/wishlist"
      aria-label={`Wishlist, ${count} saved item${count !== 1 ? "s" : ""}`}
      className="relative p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
    >
      <Heart className="w-5 h-5" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 `min-w-[18px]` `h-[18px]` px-1 flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold rounded-full leading-none border-2 border-shop_dark_green"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}