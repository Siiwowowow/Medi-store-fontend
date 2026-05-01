// src/components/shared/Seller/StatusBadge.tsx

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  ACTIVE: { bg: "bg-green-50", text: "text-green-700", label: "Active" },
  INACTIVE: { bg: "bg-gray-100", text: "text-gray-500", label: "Inactive" },
  PENDING: { bg: "bg-amber-50", text: "text-amber-700", label: "Pending" },
  PROCESSING: { bg: "bg-blue-50", text: "text-blue-700", label: "Processing" },
  SHIPPED: { bg: "bg-indigo-50", text: "text-indigo-700", label: "Shipped" },
  DELIVERED: { bg: "bg-green-50", text: "text-green-700", label: "Delivered" },
  CANCELLED: { bg: "bg-red-50", text: "text-red-600", label: "Cancelled" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { bg: "bg-gray-50", text: "text-gray-500", label: status };
  
  return (
    <span className={cn("inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide", config.bg, config.text, className)}>
      {config.label}
    </span>
  );
}