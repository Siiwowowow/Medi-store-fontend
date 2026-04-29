"use client";

import Link from "next/link";
import { Pill } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="bg-shop_dark_green mb-20 py-20 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/4 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#fb6c08]/8 rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="text-center max-w-[600px] mx-auto">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-[#fb6c08]/15 border border-[#fb6c08]/30 rounded-full px-4 py-1.5">
            <Pill className="w-3.5 h-3.5 text-[#fb6c08]" />
            <span className="text-[12px] font-semibold text-[#fb6c08] Poppins">Join MediStore Today</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-[44px] font-extrabold text-white mt-5 tracking-[-.03em] leading-tight Poppins">
            Ready to Order Your Medicines?
          </h2>

          {/* Body */}
          <p className="text-base text-white/65 mt-4 max-w-[480px] mx-auto Poppins">
            Browse 10,000+ genuine OTC medicines, compare prices, and get same-day delivery to your door.
          </p>

          {/* Button Row */}
          <div className="flex justify-center gap-4 mt-8">
            <Link
              href="/shop"
              className="bg-[#fb6c08] text-white h-12 px-10 rounded-[10px] font-bold flex items-center justify-center transition hover:bg-[#e05e06] shadow-[0_4px_20px_rgba(251,108,8,0.4)] Poppins"
            >
              Shop Now
            </Link>
            <Link
              href="/register?role=SELLER"
              className="border-2 border-white/30 text-white h-12 px-10 rounded-[10px] font-semibold flex items-center justify-center transition hover:border-white/60 Poppins"
            >
              Become a Seller
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}