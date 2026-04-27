/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    location: "Dhaka, Bangladesh",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "MediStore has been a lifesaver! I ordered medicines for my father and they arrived within 24 hours. The products are authentic and prices are reasonable. Highly recommended!",
    verified: true,
    date: "March 15, 2026"
  },
  {
    id: 2,
    name: "Rafiq Hasan",
    location: "Chittagong, Bangladesh",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Excellent service! Got my vitamin supplements delivered on time. The packaging was secure and the customer support is very helpful. Will definitely order again.",
    verified: true,
    date: "March 10, 2026"
  },
  {
    id: 3,
    name: "Tahmina Akter",
    location: "Sylhet, Bangladesh",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    text: "Good experience overall. The medicines are genuine and delivery was quick. The website is easy to use. Would recommend to family and friends.",
    verified: true,
    date: "March 5, 2026"
  },
  {
    id: 4,
    name: "Imran Khan",
    location: "Rajshahi, Bangladesh",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    text: "Best online pharmacy in Bangladesh! The discount offers are great and the customer service is outstanding. Keep up the good work!",
    verified: true,
    date: "February 28, 2026"
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    location: "Khulna, Bangladesh",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    rating: 5,
    text: "Very impressed with the service. Got my prescribed medicines delivered to my doorstep. The cash on delivery option is very convenient.",
    verified: true,
    date: "February 20, 2026"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i < rating ? "#fb6c08" : "none"}
          stroke="#fb6c08"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const visibleCount = 3;

  // ✅ AUTO SLIDE
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= testimonials.length - visibleCount) {
          return 0; // loop back
        }
        return prev + 1;
      });
    }, 4000); // speed (4 sec)

    return () => clearInterval(interval);
  }, [autoPlay]);

  // pause then resume
  const pauseAuto = () => {
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const nextSlide = () => {
    pauseAuto();
    setCurrentIndex((prev) =>
      Math.min(prev + 1, testimonials.length - visibleCount)
    );
  };

  const prevSlide = () => {
    pauseAuto();
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  const showPrev = currentIndex > 0;
  const showNext = currentIndex < testimonials.length - visibleCount;

  return (
    <section className="py-16 md:py-20 bg-[#f1f3f8]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[#3b9c3c]">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Customers Say
          </h2>
          <p className="text-sm text-gray-600 mt-3">
            Trusted by thousands across Bangladesh
          </p>
        </div>

        {/* Slider */}
        <div className="relative">

          {/* Prev */}
          <button
            onClick={prevSlide}
            disabled={!showPrev}
            className={`absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full ${
              showPrev ? "bg-white shadow hover:scale-105" : "bg-gray-200"
            }`}
          >
            <ChevronLeft />
          </button>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
              >
                <Quote className="opacity-30 mb-3" />

                <StarRating rating={t.rating} />

                <p className="text-sm my-4 line-clamp-4">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3 border-t pt-3">
                  <img
                    src={t.avatar}
                    className="w-10 h-10 rounded-full"
                    alt={t.name}
                  />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={nextSlide}
            disabled={!showNext}
            className={`absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full ${
              showNext ? "bg-white shadow hover:scale-105" : "bg-gray-200"
            }`}
          >
            <ChevronRight />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials
            .slice(0, testimonials.length - visibleCount + 1)
            .map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  pauseAuto();
                  setCurrentIndex(idx);
                }}
                className={`rounded-full transition ${
                  currentIndex === idx ? "w-6 h-2 bg-[#fb6c08]" : "w-2 h-2 bg-gray-300"
                }`}
              />
            ))}
        </div>

      </div>
    </section>
  );
}