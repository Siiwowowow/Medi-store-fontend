/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Shield, 
  Truck, 
  Headphones,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
 
} from "lucide-react";

// Slide Data
const slides = [
  {
    id: 1,
    title: "Get 20% OFF",
    highlight: "on First Order",
    description: "Use code: MEDI20 at checkout. Free delivery on all orders above $30.",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&h=600&fit=crop",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    badge: "Limited Offer",
    badgeIcon: Star,
    productName: "Napa 500mg",
    discount: "20% OFF",
  },
  {
    id: 2,
    title: "Save Up to",
    highlight: "30% OFF",
    description: "Best prices on vitamins & supplements. Genuine products guaranteed.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=600&fit=crop",
    ctaText: "Shop Vitamins",
    ctaLink: "/shop?category=vitamins",
    badge: "Mega Sale",
    badgeIcon: Sparkles,
    productName: "Vitamin C 500mg",
    discount: "30% OFF",
  },
  {
    id: 3,
    title: "Free Delivery",
    highlight: "On Orders $30+",
    description: "Get your medicines delivered at your doorstep. Cash on delivery available.",
    image: "https://images.unsplash.com/photo-1617881770125-6fb0d039ecde?w=800&h=600&fit=crop",
    ctaText: "Explore Now",
    ctaLink: "/shop",
    badge: "Free Shipping",
    badgeIcon: Truck,
    productName: "All Medicines",
    discount: "Free Delivery",
  },
];

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders $30+" },
  { icon: Shield, title: "100% Genuine", desc: "Authentic products" },
  { icon: Headphones, title: "24/7 Support", desc: "Quick assistance" },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const current = slides[currentSlide];

  return (
    <section className="relative bg-shop_dark_green overflow-hidden">
      {/* Industrial geometric pattern - no gradients */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 border-2 border-white/10 rounded-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 border-2 border-white/10 rounded-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-none" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* LEFT CONTENT - Industrial Typography */}
          <div className="text-center lg:text-left">
            {/* Badge - Industrial style */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/5 rounded-[8px] mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-shop_light_green" />
              <current.badgeIcon className="w-3.5 h-3.5 text-shop_orange" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70">
                {current.badge}
              </span>
            </div>
            
            {/* Title - Bold industrial typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-[-0.03em] leading-[1.1] mb-4 text-white">
              {current.title}
              <span className="block text-shop_orange">
                {current.highlight}
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-sm sm:text-base text-white/60 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              {current.description}
            </p>
            
            {/* CTAs - Industrial buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <Link
                href={current.ctaLink}
                className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 sm:px-8 rounded-[10px] font-semibold text-sm transition-all duration-200 hover:bg-[#e05e06] shadow-[0_4px_16px_rgba(251,108,8,0.3)]"
                style={{ background: "#fb6c08", color: "white" }}
              >
                {current.ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 sm:px-8 h-11 sm:h-12 rounded-[10px] font-semibold text-sm transition-all duration-200 border-2 border-white/30 hover:border-white/60 hover:bg-white/5"
                style={{ color: "white" }}
              >
                Learn More
              </Link>
            </div>
            
            {/* Trust Badges - Industrial grid */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start pt-4 border-t border-white/10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[8px] bg-white/5 border border-white/10 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-white">{feature.title}</p>
                    <p className="text-[10px] sm:text-xs text-white/50">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* RIGHT SIDE - Product Showcase - Industrial card */}
          <div className="relative">
            {/* Discount Badge - Industrial style */}
            <div className="absolute -top-3 -right-3 z-20 px-3 py-1.5 rounded-[8px] text-xs font-bold bg-shop_orange text-white shadow-lg">
              {current.discount}
            </div>

            {/* Carousel Container - No shadows, just border */}
            <div className="relative rounded-[12px] border-[1.5px] border-white/10 bg-white/5 overflow-hidden">
              <div className="relative aspect-4/3">
                <img
                  src={current.image}
                  alt={current.productName}
                  className="w-full h-full object-cover"
                />
                
                {/* Product Name Overlay - Industrial */}
                <div className="absolute bottom-3 left-3 bg-shop_dark_green/90 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-[8px]">
                  <p className="text-xs font-semibold text-white/90">{current.productName}</p>
                </div>
                
                {/* Slide Indicators - Geometric */}
                <div className="absolute bottom-3 right-3 flex gap-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentSlide(idx);
                        setTimeout(() => setIsAutoPlaying(true), 5000);
                      }}
                      className={`transition-all duration-300 rounded-full ${
                        currentSlide === idx ? "w-5 h-1" : "w-1.5 h-1 bg-white/40 hover:bg-white/60"
                      }`}
                      style={currentSlide === idx ? { background: "#fb6c08" } : {}}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons - Industrial */}
            <button
              onClick={prevSlide}
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[8px] bg-shop_dark_green border border-white/20 flex items-center justify-center transition-all duration-200 hover:border-white/40 hover:bg-white/5 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[8px] bg-shop_dark_green border border-white/20 flex items-center justify-center transition-all duration-200 hover:border-white/40 hover:bg-white/5 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Industrial bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-shop_orange/50 to-transparent" />
    </section>
  );
}