"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, LayoutGrid, ArrowRight } from "lucide-react";
import type { CategoryMenuProps } from "./types";

export default function CategoryMenu({ categories }: CategoryMenuProps) {
  const [open, setOpen]             = useState(false);
  const [activeCategory, setActive] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // ── Close on outside click ──
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setActive(null);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // ── Close on Escape ──
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); setActive(null); }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  return (
    // ⚠️ position:static on parent — dropdown escapes any overflow:hidden ancestor
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (open) setActive(null);
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap focus:outline-none"
        style={{
          color:      open ? "#ffffff"               : "rgba(255,255,255,0.65)",
          background: open ? "rgba(255,255,255,0.15)" : "transparent",
          fontFamily: "var(--font-poppins)",
        }}
        onMouseEnter={(e) => {
          if (!open) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
        }}
        onMouseLeave={(e) => {
          if (!open) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
        <span>Categories</span>
        <ChevronDown
          className="w-3.5 h-3.5 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* ── Dropdown — rendered with fixed stacking context ── */}
      {open && (
        <div
          style={{
            position:        "absolute",
            top:             "calc(100% + 10px)",
            left:            0,
            width:           "288px",
            background:      "#ffffff",
            border:          "1px solid #e5e7eb",
            borderRadius:    "16px",
            boxShadow:       "0 20px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
            zIndex:          9999,
            overflow:        "hidden",
            fontFamily:      "var(--font-poppins)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding:      "10px 16px",
              background:   "#f6f6f6",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <p
              style={{
                fontSize:      "10px",
                fontWeight:    700,
                textTransform: "uppercase",
                letterSpacing: ".12em",
                color:         "#52525b",
                margin:        0,
              }}
            >
              Browse Categories
            </p>
          </div>

          {/* List */}
          <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
            {categories.map((cat) => (
              <div key={cat.href}>
                {/* Parent category row */}
                <button
                  type="button"
                  onClick={() => {
                    if (cat.subcategories && cat.subcategories.length > 0) {
                      setActive((prev) => (prev === cat.label ? null : cat.label));
                    } else {
                      window.location.href = cat.href;
                      setOpen(false);
                      setActive(null);
                    }
                  }}
                  className="w-full text-left flex items-center justify-between transition-colors duration-150"
                  style={{
                    padding:    "10px 16px",
                    fontSize:   "14px",
                    fontWeight: activeCategory === cat.label ? 600 : 500,
                    color:      activeCategory === cat.label ? "#063c28" : "#151515",
                    background: activeCategory === cat.label ? "#fcf0e4" : "transparent",
                    cursor:     "pointer",
                    border:     "none",
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== cat.label)
                      (e.currentTarget as HTMLButtonElement).style.background = "#f6f6f6";
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== cat.label)
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  <span>{cat.label}</span>
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <ChevronDown
                      style={{
                        width:     "14px",
                        height:    "14px",
                        color:     "#52525b",
                        flexShrink: 0,
                        transform: activeCategory === cat.label ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 200ms ease",
                      }}
                    />
                  )}
                </button>

                {/* Subcategories */}
                {cat.subcategories &&
                  activeCategory === cat.label && (
                    <div
                      style={{
                        paddingLeft:   "36px",
                        paddingRight:  "16px",
                        paddingBottom: "8px",
                        background:    "rgba(246,246,246,0.6)",
                      }}
                    >
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => { setOpen(false); setActive(null); }}
                          className="flex items-center gap-1.5 transition-colors duration-150"
                          style={{
                            padding:    "6px 0",
                            fontSize:   "12px",
                            color:      "#52525b",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.color = "#063c28")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.color = "#52525b")
                          }
                        >
                          <span
                            style={{
                              width:        "5px",
                              height:       "5px",
                              borderRadius: "50%",
                              background:   "#3b9c3c",
                              flexShrink:   0,
                            }}
                          />
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              padding:   "10px 16px",
            }}
          >
            <Link
              href="/shop"
              onClick={() => { setOpen(false); setActive(null); }}
              className="flex items-center justify-between transition-colors duration-150"
              style={{
                fontSize:       "13px",
                fontWeight:     600,
                color:          "#063c28",
                textDecoration: "none",
                padding:        "4px 0",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#fb6c08")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#063c28")
              }
            >
              <span>View All Categories</span>
              <ArrowRight style={{ width: "15px", height: "15px" }} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}