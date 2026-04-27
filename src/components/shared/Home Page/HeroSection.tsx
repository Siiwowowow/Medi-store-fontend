/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
    badge: "⭐ Limited Offer",
    badgeIcon: Star,
    productName: "Napa 500mg",
    discount: "20% OFF",
    alt: "Napa 500mg Paracetamol medicine"
  },
  {
    id: 2,
    title: "Save Up to",
    highlight: "30% OFF",
    description: "Best prices on vitamins & supplements. Genuine products guaranteed.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=600&fit=crop",
    ctaText: "Shop Vitamins",
    ctaLink: "/shop?category=vitamins",
    badge: "⚡ Mega Sale",
    badgeIcon: Sparkles,
    productName: "Vitamin C 500mg",
    discount: "30% OFF",
    alt: "Vitamin C 500mg supplement"
  },
  {
    id: 3,
    title: "Free Delivery",
    highlight: "On Orders $30+",
    description: "Get your medicines delivered at your doorstep. Cash on delivery available.",
    image: "https://images.unsplash.com/photo-1617881770125-6fb0d039ecde?w=800&h=600&fit=crop",
    ctaText: "Explore Now",
    ctaLink: "/shop",
    badge: "🚚 Free Shipping",
    badgeIcon: Truck,
    productName: "All Medicines",
    discount: "Free Delivery",
    alt: "Medicine delivery service"
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
    <section className="relative overflow-hidden" style={{ background: "#063c28" }}>
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-5 w-48 h-48 rounded-full blur-2xl" style={{ background: "#3b9c3c20" }}></div>
        <div className="absolute bottom-10 right-5 w-56 h-56 rounded-full blur-2xl" style={{ background: "#fb6c0810" }}></div>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#3b9c3c" }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#3b9c3c" }}></span>
              </span>
              <current.badgeIcon className="w-3.5 h-3.5" style={{ color: "#fb6c08" }} />
              <span style={{ color: "#52525b" }}>{current.badge}</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins tracking-tight mb-4" style={{ color: "white" }}>
              {current.title}
              <span className="block" style={{ color: "#fb6c08" }}>
                {current.highlight}
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-base mb-8 max-w-lg mx-auto lg:mx-0" style={{ color: "rgba(255,255,255,0.8)" }}>
              {current.description}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link
                href={current.ctaLink}
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ background: "#fb6c08", color: "white" }}
              >
                {current.ctaText} 
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 h-12 rounded-xl font-semibold transition-all duration-300 border-2 hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}
              >
                Learn More
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <feature.icon className="w-4 h-4" style={{ color: "white" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "white" }}>{feature.title}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* RIGHT SIDE - Product Showcase */}
          <div className="relative">
            {/* Discount Badge */}
            <div className="absolute -top-3 -right-3 z-20 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg" style={{ background: "#fb6c08", color: "white" }}>
              {current.discount}
            </div>

            {/* Carousel Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              <div className="relative aspect-4/3">
               <img
                  src={current.image}
                  alt={current.productName}
                  className="w-full h-full object-cover rounded-xl"
                />
                
                {/* Product Name Overlay */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm z-10">
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
                        currentSlide === idx ? "w-6 h-1.5" : "w-1.5 h-1.5 bg-white/60 hover:bg-white"
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
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 z-10"
              style={{ color: "#063c28" }}
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}