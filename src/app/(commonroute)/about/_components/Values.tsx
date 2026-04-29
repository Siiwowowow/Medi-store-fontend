"use client";

import { Shield, Truck, HeartHandshake, ShieldCheck, Headphones, Leaf } from "lucide-react";

const values = [
  {
    number: "01",
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "We only work with licensed, verified sellers. Every medicine listed has passed our quality checks. No compromises.",
  },
  {
    number: "02",
    icon: Truck,
    title: "Speed & Reliability",
    description:
      "Orders placed before 3pm are dispatched same day. We track every delivery so you always know where your medicines are.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Accessibility",
    description:
      "Whether you're in Dhaka or Sylhet, we deliver. Fair pricing, no hidden charges, and cash on delivery for everyone.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "All medicines are sourced directly from licensed manufacturers and verified distributors. Authenticity guaranteed.",
  },
  {
    number: "05",
    icon: Headphones,
    title: "Customer First",
    description:
      "Our support team is available 24/7. Chat, call, or email — we respond within minutes, not hours.",
  },
  {
    number: "06",
    icon: Leaf,
    title: "Sustainability",
    description:
      "Eco-friendly packaging, optimized delivery routes, and a commitment to reducing pharmaceutical waste.",
  },
];

export default function Values() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#fb6c08]" />
            <span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#fb6c08] Poppins">
              CORE VALUES
            </span>
            <div className="w-8 h-[2px] bg-[#fb6c08]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#151515] tracking-[-.03em] Poppins">
            What Drives Everything We Do
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="border-[1.5px] border-[#e5e7eb] rounded-xl p-7 bg-white transition-all hover:border-[#063c28] hover:bg-[#f6f6f6]"
            >
              <div className="text-[48px] font-black text-[#063c28]/06 leading-none Poppins">
                {value.number}
              </div>
              <div className="w-12 h-12 rounded-[10px] bg-[#063c28] flex items-center justify-center mt-4">
                <value.icon className="w-5.5 h-5.5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#151515] mt-4 tracking-[-.01em] Poppins">
                {value.title}
              </h3>
              <p className="text-sm text-[#52525b] leading-[1.7] mt-3 Poppins">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}