// src/components/admin/StatCard.tsx

"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  trend?: { value: string; isPositive: boolean };
  subtext?: string;
  delay?: number;
}

export function StatCard({ label, value, icon: Icon, iconBg, iconColor, trend, subtext, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white border-[1.5px] border-gray-200 rounded-xl p-5 transition-all hover:border-gray-300"
    >
      <div className={cn("w-11 h-11 rounded-[10px] flex items-center justify-center", iconBg)}>
        <Icon className={cn("w-5 h-5", iconColor)} />
      </div>
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-lightColor mt-4">{label}</p>
      <p className="text-[32px] font-extrabold text-darkColor mt-1 leading-none tracking-[-0.04em]">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          <span className={cn("text-[10px] font-semibold", trend.isPositive ? "text-shop_light_green" : "text-red-500")}>
            {trend.isPositive ? "↑" : "↓"} {trend.value}
          </span>
          <span className="text-[10px] text-lightColor">vs last month</span>
        </div>
      )}
      {subtext && <p className="text-[10px] text-lightColor mt-2">{subtext}</p>}
    </motion.div>
  );
}