/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import type { Medicine } from "@/services/medicine.service";
import MedicineCard from "../../_components/MedicineCard";

interface RelatedProductsProps {
  products: Medicine[];
  currentProductId: string;
}

export default function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  // Filter out current product and limit to 4
  const relatedProducts = products
    .filter(p => p.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="bg-gradient-to-b from-white to-[#f8faf9] py-20 border-t border-gray-100">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-shop_orange/10 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-shop_orange" />
              <span className="text-shop_orange text-[10px] font-bold uppercase tracking-widest">Handpicked for you</span>
            </div>
            <h2 className="text-3xl font-black text-[#063c28] tracking-tight">
              Related <span className="text-shop_orange">Products</span>
            </h2>
            <p className="text-sm text-gray-500 font-medium max-w-md">
              Based on the medicine you're viewing, these items might also be helpful for your health journey.
            </p>
          </div>
          
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-sm font-bold text-shop_dark_green hover:text-shop_orange transition-all duration-300"
          >
            <span>View all products</span>
            <div className="w-8 h-8 rounded-full bg-[#fcf0e4] flex items-center justify-center group-hover:bg-shop_orange group-hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Professional Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MedicineCard 
                medicine={product} 
                priority={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


