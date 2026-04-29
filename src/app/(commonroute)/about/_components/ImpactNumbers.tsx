"use client";

import { Package, Users, Store, Star } from "lucide-react";

const stats = [
  {
    icon: Package,
    value: "10,000",
    suffix: "+",
    label: "Medicines",
    sublabel: "and growing",
  },
  {
    icon: Users,
    value: "50,000",
    suffix: "+",
    label: "Customers",
    sublabel: "across Bangladesh",
  },
  {
    icon: Store,
    value: "500",
    suffix: "+",
    label: "Verified Sellers",
    sublabel: "licensed pharmacies",
  },
  {
    icon: Star,
    value: "4.8",
    suffix: "/5",
    label: "Average Rating",
    sublabel: "from 12,000+ reviews",
  },
];

export default function ImpactNumbers() {
  return (
    <section className="bg-[#063c28] py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#fb6c08]" />
            <span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#fb6c08] Poppins">
              OUR IMPACT
            </span>
            <div className="w-8 h-[2px] bg-[#fb6c08]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-[-.03em] Poppins">
            Numbers That Define Us
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-xl p-7 text-center transition-all hover:bg-white/8 hover:border-white/20"
            >
              <div className="w-12 h-12 rounded-full bg-[#fb6c08]/15 flex items-center justify-center mx-auto">
                <stat.icon className="w-6 h-6 text-[#fb6c08]" />
              </div>
              <div className="mt-4">
                <span className="text-[44px] font-extrabold text-[#fb6c08] leading-none tracking-[-.04em] Poppins">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-2xl font-bold text-[#fb6c08] Poppins">{stat.suffix}</span>
                )}
              </div>
              <p className="text-[13px] font-medium text-white/60 uppercase tracking-[.06em] mt-2 Poppins">
                {stat.label}
              </p>
              <p className="text-[11px] text-white/35 mt-1 Poppins">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}