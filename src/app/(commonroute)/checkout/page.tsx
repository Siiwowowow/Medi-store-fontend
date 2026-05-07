"use client";

import CheckoutForm from "@/components/Checkout/CheckoutForm";
import { Truck, ShieldCheck, Clock } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-[#063c28] tracking-tight">
              Secure <span className="text-[#fb6c08]">Checkout</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-md">
              Complete your order and get your medicines delivered right to your doorstep.
            </p>
          </div>
          
          <div className="flex items-center gap-6 bg-white p-4 rounded-[24px] shadow-sm border border-gray-100">
            {[
              { icon: Truck, label: "Express Delivery", color: "text-blue-500", bg: "bg-blue-50" },
              { icon: ShieldCheck, label: "Secure Payment", color: "text-green-500", bg: "bg-green-50" },
              { icon: Clock, label: "24/7 Support", color: "text-orange-500", bg: "bg-orange-50" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <CheckoutForm />
      </div>
    </div>
  );
}
