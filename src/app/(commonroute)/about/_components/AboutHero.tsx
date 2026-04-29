/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { ChevronRight, Package, Users, Star, Truck } from "lucide-react";

const stats = [
  { value: "10,000+", unit: "", label: "OTC Medicines Listed", icon: Package },
  { value: "500+", unit: "", label: "Verified Sellers", icon: Users },
  { value: "50,000+", unit: "", label: "Satisfied Customers", icon: Star },
];

export default function AboutHero() {
  return (
    <>



      {/* Hero Section */}
      <section className="bg-shop_dark_green min-h-[480px] md:min-h-[480px] flex items-center">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column */}
            <div className="space-y-6">
              {/* Top Label Row */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-[2px] bg-[#fb6c08]" />
                <span className="text-[11px] font-bold uppercase tracking-[.15em] text-[#fb6c08] Poppins">
                  ABOUT MEDISTORE
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.05] tracking-[-.03em] Poppins">
                Bangladesh's Most
                <br />
                Trusted Online
                <br />
                <span className="relative inline-block">
                  Pharmacy
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#fb6c08]" />
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-white/65 max-w-[440px] leading-relaxed mt-2 Poppins">
                Since 2020, we've connected thousands of verified sellers with patients who need reliable, 
                affordable OTC medicines — delivered to their doorstep.
              </p>

              {/* CTA Row */}
              <div className="flex gap-4 mt-4">
                <a href="#mission" className="bg-[#fb6c08] text-white h-12 px-8 rounded-[10px] font-semibold flex items-center justify-center transition hover:bg-[#e05e06] shadow-[0_4px_16px_rgba(251,108,8,0.35)] Poppins">
                  Our Story
                </a>
                <a href="#team" className="border-2 border-white/30 text-white h-12 px-8 rounded-[10px] font-semibold flex items-center justify-center transition hover:border-white/60 Poppins">
                  View Team
                </a>
              </div>
            </div>

            {/* Right Column - Stat Blocks */}
            <div className="flex flex-col gap-6">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-center md:text-left">
                    <div className="flex items-baseline justify-center md:justify-start gap-1">
                      <span className="text-[52px] font-extrabold text-[#fb6c08] leading-none tracking-[-.04em] Poppins">
                        {stat.value}
                      </span>
                      {stat.unit && (
                        <span className="text-2xl font-bold text-[#fb6c08] Poppins">{stat.unit}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                      <stat.icon className="w-4 h-4 text-white/40" />
                      <span className="text-[13px] font-medium text-white/60 uppercase tracking-[.08em] Poppins">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                  {idx < stats.length - 1 && <div className="w-full h-px bg-white/12 my-4" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Bar - Trust Items */}
      <div className="bg-[#052e1f] h-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-full flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3b9c3c]" />
            <span className="text-xs font-medium text-white/65 Poppins">Genuine OTC Medicines</span>
          </div>
          <div className="w-px h-4 bg-white/15 hidden md:block" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3b9c3c]" />
            <span className="text-xs font-medium text-white/65 Poppins">Cash on Delivery</span>
          </div>
          <div className="w-px h-4 bg-white/15 hidden md:block" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3b9c3c]" />
            <span className="text-xs font-medium text-white/65 Poppins">24hr Support</span>
          </div>
          <div className="w-px h-4 bg-white/15 hidden md:block" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3b9c3c]" />
            <span className="text-xs font-medium text-white/65 Poppins">Verified Sellers</span>
          </div>
        </div>
      </div>
    </>
  );
}