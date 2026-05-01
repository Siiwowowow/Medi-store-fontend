// src/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTimeAgo = (date: string | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const getStockColor = (stock: number): string => {
  if (stock === 0) return 'text-red-500';
  if (stock < 5) return 'text-red-500';
  if (stock < 20) return 'text-amber-600';
  return 'text-green-600';
};

export const getStockBarColor = (stock: number): string => {
  if (stock === 0) return 'bg-red-500';
  if (stock < 5) return 'bg-red-500';
  if (stock < 20) return 'bg-amber-500';
  return 'bg-green-500';
};

export const getStockPercentage = (stock: number, max = 200): number => {
  return Math.min(100, (stock / max) * 100);
};

export const getOrderStatusConfig = (status: string) => {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    PENDING: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Placed' },
    PROCESSING: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Processing' },
    SHIPPED: { bg: 'bg-indigo-50', text: 'text-indigo-700', label: 'Shipped' },
    DELIVERED: { bg: 'bg-green-50', text: 'text-green-700', label: 'Delivered' },
    CANCELLED: { bg: 'bg-red-50', text: 'text-red-600', label: 'Cancelled' },
  };
  return config[status] || { bg: 'bg-gray-50', text: 'text-gray-600', label: status };
};