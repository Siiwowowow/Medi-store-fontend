/* eslint-disable react/no-unescaped-entities */
"use client";

import { CheckCircle, MapPin } from "lucide-react";

const checklistItems = [
  "100% genuine medicines from licensed pharmacies",
  "Verified sellers with quality assurance",
  "Transparent pricing — no hidden costs",
  "Nationwide delivery within 24–48 hours",
];

export default function MissionVision() {
  return (
    <section id="mission" className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left - Our Mission */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#fb6c08]" />
              <span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#fb6c08] Poppins">
                OUR MISSION
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#151515] leading-tight tracking-[-.025em] Poppins">
              Making Healthcare Accessible for Every Bangladeshi
            </h2>
            
            <p className="text-base text-[#52525b] leading-[1.75] mt-5 max-w-[480px] Poppins">
              MediStore was built with a single purpose — to eliminate the barriers between patients 
              and the medicines they need. We partner with verified pharmacies and sellers across 
              Bangladesh to bring genuine, affordable OTC medicines to every doorstep.
            </p>
            
            <div className="mt-6 flex flex-col gap-3">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#3b9c3c]/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-[#3b9c3c]" />
                  </div>
                  <span className="text-sm text-[#52525b] font-medium Poppins">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Our Vision */}
          <div>
            <div className="border-l-4 border-[#063c28] bg-[#f6f6f6] rounded-r-2xl p-8">
              <div className="text-[80px] font-black text-[#063c28]/08 leading-none -mt-5 Poppins">
                "
              </div>
              <p className="text-xl md:text-[22px] font-bold text-[#151515] leading-[1.4] tracking-[-.01em] mt-2 Poppins">
                A Bangladesh where every person has access to the medicines they need, when they need them.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-11 h-11 rounded-full bg-[#063c28] flex items-center justify-center">
                  <span className="text-white font-bold text-sm Poppins">MK</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#151515] Poppins">Mohammad Karim</p>
                  <p className="text-xs text-[#9ca3af] Poppins">Co-Founder & CEO</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 border border-[#063c28]/20 rounded-[10px] px-4 py-2">
                <MapPin className="w-4 h-4 text-[#063c28]" />
                <span className="text-sm font-semibold text-[#063c28] Poppins">Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}