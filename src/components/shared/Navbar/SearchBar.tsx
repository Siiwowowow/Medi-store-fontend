"use client";

import { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { SearchBarProps } from "./types";

export default function SearchBar({ placeholder = "Search medicines...", onSearch }: SearchBarProps) {
  const [query,   setQuery]   = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router   = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch?.(query.trim());
    router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center w-full rounded-full px-3.5 py-2 gap-2 transition-all duration-200 border ${
        focused
          ? "bg-white border-shop_light_green shadow-[0_0_0_3px_rgba(59,156,60,0.12)]"
          : "bg-shop_light_bg border-gray-200"
      }`}
    >
      <Search className={`w-3.5 h-3.5 shrink-0 transition-colors ${focused ? "text-shop_dark_green" : "text-lightColor"}`} />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-darkColor placeholder:text-lightColor/60 outline-none min-w-0"
        style={{ fontFamily: "var(--font-poppins)" }}
        aria-label="Search medicines"
      />
      {query && (
        <button type="button" onClick={() => { setQuery(""); inputRef.current?.focus(); }} aria-label="Clear">
          <X className="w-3 h-3 text-lightColor hover:text-darkColor transition-colors" />
        </button>
      )}
    </form>
  );
}