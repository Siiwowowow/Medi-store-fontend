// src/components/seller/StatCard.tsx

"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  trend?: { value: string; isPositive: boolean };
  subtext?: string;
}

export function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  iconBg, 
  iconColor, 
  trend, 
  subtext 
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 transition-all hover:border-gray-200">
      {/* Icon Circle */}
      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", iconBg)}>
        <Icon className={cn("w-5 h-5", iconColor)} />
      </div>
      
      {/* Label */}
      <p className="text-xs text-gray-500 font-medium mt-3">{label}</p>
      
      {/* Value */}
      <p className="text-[28px] font-bold text-gray-900 mt-1 leading-none">
        {value}
      </p>
      
      {/* Trend (if provided) */}
      {trend && (
        <span className={cn(
          "inline-flex items-center gap-1 text-[10px] font-semibold rounded-full px-2.5 py-0.5 mt-2 w-fit",
          trend.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
        )}>
          {trend.isPositive ? "▲" : "▼"} {trend.value}
        </span>
      )}
      
      {/* Subtext (if provided) */}
      {subtext && (
        <p className="text-[10px] text-gray-400 mt-2">{subtext}</p>
      )}
    </div>
  );
}