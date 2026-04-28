"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage:  number;
  totalPages:   number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3)              pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const btnBase: React.CSSProperties = {
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    height:         "36px",
    borderRadius:   "8px",
    border:         "1px solid #e5e7eb",
    background:     "#ffffff",
    cursor:         "pointer",
    fontFamily:     "var(--font-poppins)",
    fontSize:       "13px",
    fontWeight:     500,
    transition:     "all .15s ease",
    color:          "#52525b",
  };

  return (
    <div className="flex items-center justify-center gap-1.5 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...btnBase,
          padding:    "0 12px",
          gap:        "4px",
          opacity:    currentPage === 1 ? 0.4 : 1,
          cursor:     currentPage === 1 ? "not-allowed" : "pointer",
        }}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#063c28";
            (e.currentTarget as HTMLButtonElement).style.color       = "#063c28";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e7eb";
          (e.currentTarget as HTMLButtonElement).style.color       = "#52525b";
        }}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Prev
      </button>

      {/* Pages */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`e-${i}`}
            style={{ color: "#9ca3af", fontFamily: "var(--font-poppins)", width: "24px", textAlign: "center" }}
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            style={{
              ...btnBase,
              width:       "36px",
              background:  currentPage === p ? "#063c28" : "#ffffff",
              color:       currentPage === p ? "#ffffff" : "#52525b",
              borderColor: currentPage === p ? "#063c28" : "#e5e7eb",
              fontWeight:  currentPage === p ? 700 : 500,
            }}
            onMouseEnter={(e) => {
              if (currentPage !== p) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#063c28";
                (e.currentTarget as HTMLButtonElement).style.color       = "#063c28";
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== p) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e7eb";
                (e.currentTarget as HTMLButtonElement).style.color       = "#52525b";
              }
            }}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...btnBase,
          padding: "0 12px",
          gap:     "4px",
          opacity: currentPage === totalPages ? 0.4 : 1,
          cursor:  currentPage === totalPages ? "not-allowed" : "pointer",
        }}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#063c28";
            (e.currentTarget as HTMLButtonElement).style.color       = "#063c28";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e7eb";
          (e.currentTarget as HTMLButtonElement).style.color       = "#52525b";
        }}
      >
        Next
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}