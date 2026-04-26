"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Truck } from "lucide-react";

export default function TopBar() {
  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;

  return (
    <div className="w-full bg-shop_dark_green text-white py-2 px-4 flex items-center justify-center relative">
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <Truck
          className="w-3.5 h-3.5 shrink-0"
          style={{ color: "#3b9c3c" }}
        />
        <p className="text-center" style={{ color: "rgba(255,255,255,0.8)" }}>
          Free delivery on orders over ৳500!{" "}
          <Link
            href="/shop"
            className="font-semibold hover:underline underline-offset-2 transition-colors ml-1"
            style={{ color: "#fb6c08" }}
          >
            Shop Now →
          </Link>
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-white"
        style={{ color: "rgba(255,255,255,1)" }}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}