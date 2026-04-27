/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Gift, ArrowRight, Sparkles } from "lucide-react";

// Calculate time left until a target date
const getTimeLeft = () => {
  // Set target date to 3 days from now at 23:59:59
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  targetDate.setHours(23, 59, 59, 59);
  
  const difference = targetDate.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
  
  return {
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export default function PromoBanner() {
  // ✅ Initialize with null to prevent hydration mismatch
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(getTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Hours", value: timeLeft?.hours ?? 0 },
    { label: "Minutes", value: timeLeft?.minutes ?? 0 },
    { label: "Seconds", value: timeLeft?.seconds ?? 0 },
  ];

  // ✅ Show placeholder during SSR to avoid hydration mismatch
  if (!isMounted || !timeLeft) {
    return (
      <section className="py-16 md:py-20 overflow-hidden" style={{ background: "#063c28" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(251,108,8,0.15)" }}>
                <Sparkles className="w-3.5 h-3.5" style={{ color: "#fb6c08" }} />
                <span className="text-xs font-semibold" style={{ color: "#fb6c08" }}>LIMITED TIME OFFER</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-4" style={{ color: "white" }}>
                Get 20% Off
                <span className="block" style={{ color: "#fb6c08" }}>Your First Order</span>
              </h2>
              <p className="text-base mb-6 max-w-md mx-auto lg:mx-0" style={{ color: "rgba(255,255,255,0.8)" }}>
                Use code: <span className="font-mono font-bold tracking-wider" style={{ color: "#fb6c08" }}>MEDI20</span> at checkout.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:gap-3 shadow-lg hover:shadow-xl"
                style={{ background: "#fb6c08", color: "white" }}
              >
                Grab Deal Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="text-center flex-1">
              <div className="inline-flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5" style={{ color: "#fb6c08" }} />
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>Loading offer...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 overflow-hidden" style={{ background: "#063c28" }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Content */}
          <div className="text-center lg:text-left flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(251,108,8,0.15)" }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: "#fb6c08" }} />
              <span className="text-xs font-semibold" style={{ color: "#fb6c08" }}>LIMITED TIME OFFER</span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-4" style={{ color: "white" }}>
              Get 20% Off
              <span className="block" style={{ color: "#fb6c08" }}>Your First Order</span>
            </h2>
            
            {/* Description */}
            <p className="text-base mb-6 max-w-md mx-auto lg:mx-0" style={{ color: "rgba(255,255,255,0.8)" }}>
              Use code: <span className="font-mono font-bold tracking-wider" style={{ color: "#fb6c08" }}>MEDI20</span> at checkout.
              Free delivery on all orders above ৳500.
            </p>
            
            {/* CTA Button */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:gap-3 shadow-lg hover:shadow-xl"
              style={{ background: "#fb6c08", color: "white" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Grab Deal Now
              <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
            </Link>
          </div>

          {/* Right Content - Countdown Timer */}
          <div className="text-center flex-1">
            <div className="inline-flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5" style={{ color: "#fb6c08" }} />
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>Offer ends in:</span>
            </div>
            
            <div className="flex justify-center gap-4">
              {timeUnits.map((unit) => (
                <div key={unit.label} className="text-center">
                  <div 
                    className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
                  >
                    <span className="text-2xl md:text-3xl font-bold font-mono" style={{ color: "white" }}>
                      {String(unit.value).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.6)" }}>{unit.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}