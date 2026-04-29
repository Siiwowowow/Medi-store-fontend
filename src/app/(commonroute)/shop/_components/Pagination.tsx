"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-1 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 h-9 rounded-lg border border-gray-200 text-[#52525b] text-sm disabled:opacity-50 hover:border-[#063c28] transition"
      >
        ← Prev
      </button>

      {[...Array(Math.min(5, totalPages))].map((_, i) => {
        let pageNum: number;
        if (totalPages <= 5) {
          pageNum = i + 1;
        } else if (currentPage <= 3) {
          pageNum = i + 1;
        } else if (currentPage >= totalPages - 2) {
          pageNum = totalPages - 4 + i;
        } else {
          pageNum = currentPage - 2 + i;
        }

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
              currentPage === pageNum
                ? "bg-[#063c28] text-white"
                : "border border-gray-200 text-[#52525b] hover:border-[#063c28]"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 h-9 rounded-lg border border-gray-200 text-[#52525b] text-sm disabled:opacity-50 hover:border-[#063c28] transition"
      >
        Next →
      </button>
    </div>
  );
}