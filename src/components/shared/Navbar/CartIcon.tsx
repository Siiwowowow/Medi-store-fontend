"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function CartIcon({ count = 0 }: { count?: number }) {
  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} item${count !== 1 ? "s" : ""}`}
      className="relative p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
    >
      <ShoppingBag className="w-5 h-5" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 px-1 flex items-center justify-center bg-shop_orange text-white text-[10px] font-bold rounded-full leading-none border-2 border-shop_dark_green"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}