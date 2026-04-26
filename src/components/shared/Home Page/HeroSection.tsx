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
  
  Sparkles
} from "lucide-react";

// Real Slide Data with Real Product Images
const slides = [
  {
    id: 1,
    title: "Get 20% OFF",
    highlight: "on First Order",
    description: "Use code: MEDI20 at checkout. Free delivery on all orders above $30.",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TmFwYSUyMG1lZGljaW5lfGVufDB8fDB8fHww",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    badge: "⭐ Limited Offer",
    badgeIcon: Star,
    productName: "Napa 500mg",
    discount: "20% OFF"
  },
  {
    id: 2,
    title: "Save Up to",
    highlight: "30% OFF",
    description: "Best prices on vitamins & supplements. Genuine products guaranteed.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
    ctaText: "Shop Vitamins",
    ctaLink: "/shop?category=vitamins",
    badge: "⚡ Mega Sale",
    badgeIcon: Sparkles,
    productName: "Vitamin C 500mg",
    discount: "30% OFF"
  },
  {
    id: 3,
    title: "Free Delivery",
    highlight: "On Orders $30+",
    description: "Get your medicines delivered at your doorstep. Cash on delivery available.",
    image: "https://images.unsplash.com/photo-1617881770125-6fb0d039ecde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fG1lZGljaW5lfGVufDB8fDB8fHww",
    ctaText: "Explore Now",
    ctaLink: "/shop",
    badge: "🚚 Free Shipping",
    badgeIcon: Truck,
    productName: "All Medicines",
    discount: "Free Delivery"
  }
];

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders $30+", iconColor: "#3b9c3c" },
  { icon: Shield, title: "100% Genuine", desc: "Authentic products", iconColor: "#063c28" },
  { icon: Headphones, title: "24/7 Support", desc: "Quick assistance", iconColor: "#063c28" },
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
    <section className="relative overflow-hidden bg-[#fcf0e4]">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-5 w-48 h-48 rounded-full blur-2xl" style={{ background: "#3b9c3c20" }}></div>
        <div className="absolute bottom-10 right-5 w-56 h-56 rounded-full blur-2xl" style={{ background: "#fb6c0810" }}></div>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm text-xs font-medium mb-4 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#3b9c3c" }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#3b9c3c" }}></span>
              </span>
              <current.badgeIcon className="w-3 h-3" style={{ color: "#fb6c08" }} />
              <span style={{ color: "#52525b" }}>{current.badge}</span>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins tracking-tight mb-3 animate-fade-in-up" style={{ color: "#151515" }}>
              {current.title}
              <span className="block" style={{ color: "#fb6c08" }}>
                {current.highlight}
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-base text-[#52525b] mb-6 max-w-lg mx-auto lg:mx-0 animate-fade-in-up stagger-1">
              {current.description}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8 animate-fade-in-up stagger-2">
              <Link
                href={current.ctaLink}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[10px] font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
                style={{ background: "#fb6c08", color: "white" }}
              >
                {current.ctaText} 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 h-11 rounded-[10px] font-semibold transition-all duration-300 border-2 hover:-translate-y-0.5"
                style={{ borderColor: "#063c28", color: "#063c28" }}
              >
                Learn More
              </Link>
            </div>
            
            {/* Trust Badges - Smaller */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-3 border-t animate-fade-in-up stagger-3" style={{ borderColor: "#e2e8f0" }}>
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <feature.icon className="w-3.5 h-3.5" style={{ color: feature.iconColor }} />
                  </div>
                  <div>
                    <p className="font-semibold text-xs" style={{ color: "#151515" }}>{feature.title}</p>
                    <p className="text-[10px]" style={{ color: "#52525b" }}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Side - Product Showcase with Carousel */}
          <div className="relative">
            {/* Discount Badge */}
            <div className="absolute -top-2 -right-2 z-20 bg-[#fb6c08] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {current.discount}
            </div>

            {/* Carousel Container */}
            <div className="relative rounded-xl overflow-hidden shadow-lg bg-white">
              <div className="relative aspect-[4/3]">
                <img
                  src={current.image}
                  alt={current.productName}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {/* Product Name Overlay */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                  <p className="text-xs font-semibold" style={{ color: "#063c28" }}>{current.productName}</p>
                </div>
                
                {/* Slide Indicators */}
                <div className="absolute bottom-3 right-3 flex gap-1.5 z-10">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentSlide(idx);
                        setTimeout(() => setIsAutoPlaying(true), 5000);
                      }}
                      className={`transition-all duration-300 rounded-full ${
                        currentSlide === idx
                          ? "w-5 h-1.5"
                          : "w-1.5 h-1.5 bg-white/60 hover:bg-white"
                      }`}
                      style={currentSlide === idx ? { background: "#fb6c08" } : {}}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 z-10"
              style={{ color: "#063c28" }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 z-10"
              style={{ color: "#063c28" }}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}