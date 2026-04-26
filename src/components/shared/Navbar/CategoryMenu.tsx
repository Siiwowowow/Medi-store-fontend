"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Grid3x3, Sparkles } from "lucide-react";
import type { CategoryMenuProps } from "./types";

export default function CategoryMenu({ categories }: CategoryMenuProps) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => {
          setOpen((v) => !v);
          if (open) setActiveCategory(null);
        }}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
          open
            ? "bg-primary/10 text-primary"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        <Grid3x3 className="w-3.5 h-3.5" />
        <span>Categories</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-9 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 py-2 overflow-hidden animate-in fade-in zoom-in-95">
          <div className="max-h-[70vh] overflow-y-auto">
            {categories.map((cat) => (
              <div key={cat.href}>
                <Link
                  href={cat.href}
                  onClick={(e) => {
                    if (cat.subcategories && cat.subcategories.length > 0) {
                      e.preventDefault();
                      setActiveCategory((prev) => prev === cat.label ? null : cat.label);
                    } else {
                      setOpen(false);
                      setActiveCategory(null);
                    }
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 transition ${
                    activeCategory === cat.label
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <span className="text-sm font-medium">{cat.label}</span>
                  {cat.subcategories && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeCategory === cat.label ? "rotate-180" : ""}`} />
                  )}
                </Link>

                {cat.subcategories && activeCategory === cat.label && (
                  <div className="pl-10 pb-2 space-y-0.5 animate-in slide-in-from-top-1">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => {
                          setOpen(false);
                          setActiveCategory(null);
                        }}
                        className="block text-xs text-gray-500 dark:text-gray-400 hover:text-primary py-1.5 transition"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 mt-1 pt-2 px-4">
            <Link
              href="/shop"
              onClick={() => {
                setOpen(false);
                setActiveCategory(null);
              }}
              className="flex items-center justify-between text-sm text-primary font-medium py-2 hover:opacity-80 transition"
            >
              <span>View All Categories</span>
              <Sparkles className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}