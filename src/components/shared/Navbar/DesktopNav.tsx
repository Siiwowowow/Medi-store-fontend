"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { LayoutDashboard, Search, X } from "lucide-react";
import Logo from "./Logo";
import CategoryMenu from "./CategoryMenu";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";
import AuthButtons from "./AuthButtons";
import UserAvatar from "./UserAvatar";
import NavLinks from "./Navlinks ";
import { getDashboardRoute } from "./utils";
import type { NavLink, Category } from "./types";

interface Props {
  publicLinks:    NavLink[];
  categories:     Category[];
  cartCount?:     number;
  wishlistCount?: number;
}

export default function DesktopNav({
  publicLinks,
  categories,
  cartCount     = 0,
  wishlistCount = 0,
}: Props) {
  const { user }   = useUser();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query,      setQuery]      = useState("");
  const searchRef  = useRef<HTMLInputElement>(null);
  const dashRoute  = getDashboardRoute(user?.role);

  const navLinks: NavLink[] = [
    ...publicLinks,
    ...(user ? [{ label: "Dashboard", href: dashRoute, icon: LayoutDashboard }] : []),
  ];

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    // ⚠️ NO overflow-hidden here — CategoryMenu dropdown must not be clipped
    <div
      className="hidden md:block w-full"
      style={{ background: "#063c28" }}
    >
      <div
        className="flex items-center justify-between gap-2 px-4 lg:px-8 mx-auto h-[72px] max-w-[1280px]"
      >
        {/* ── LEFT: Logo + divider + Categories + divider + Nav ── */}
        <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
          <Logo />

          <div className="w-px h-6 bg-white/15 shrink-0" />

          {categories.length > 0 && (
            <div className="flex items-center">
              <CategoryMenu categories={categories} />
            </div>
          )}

          <div className="w-px h-6 bg-white/15 shrink-0" />

          {/* Nav links — NO overflow:hidden, NO overflow-x:auto */}
          <NavLinks links={navLinks} orientation="horizontal" />
        </div>

        {/* ── RIGHT: Search + Icons + Auth ── */}
        <div className="flex items-center gap-1" style={{ flexShrink: 0 }}>

          {/* Search expand */}
          {searchOpen ? (
            <div className="flex items-center gap-2" style={{ animation: "fadeInDown .2s ease both" }}>
              <div style={{ position: "relative" }}>
                <Search
                  style={{
                    position:  "absolute",
                    left:      "12px",
                    top:       "50%",
                    transform: "translateY(-50%)",
                    width:     "14px",
                    height:    "14px",
                    color:     "rgba(255,255,255,0.5)",
                  }}
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search medicines..."
                  onKeyDown={(e) => {
                    if (e.key === "Escape") { setSearchOpen(false); setQuery(""); }
                    if (e.key === "Enter" && query.trim())
                      window.location.href = `/shop?search=${encodeURIComponent(query.trim())}`;
                  }}
                  style={{
                    width:       "216px",
                    height:      "38px",
                    paddingLeft: "36px",
                    paddingRight: "12px",
                    borderRadius: "10px",
                    border:      "1px solid rgba(255,255,255,0.2)",
                    background:  "rgba(255,255,255,0.1)",
                    color:       "#ffffff",
                    fontSize:    "13px",
                    fontFamily:  "var(--font-poppins)",
                    outline:     "none",
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.4)";
                    (e.currentTarget as HTMLInputElement).style.background  = "rgba(255,255,255,0.15)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.2)";
                    (e.currentTarget as HTMLInputElement).style.background  = "rgba(255,255,255,0.1)";
                  }}
                />
              </div>
              <button
                onClick={() => { setSearchOpen(false); setQuery(""); }}
                style={{
                  padding:      "8px",
                  borderRadius: "8px",
                  color:        "rgba(255,255,255,0.6)",
                  background:   "transparent",
                  border:       "none",
                  cursor:       "pointer",
                  display:      "flex",
                  alignItems:   "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color      = "#ffffff";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color      = "rgba(255,255,255,0.6)";
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <X style={{ width: "16px", height: "16px" }} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              style={{
                padding:      "10px",
                borderRadius: "8px",
                color:        "rgba(255,255,255,0.7)",
                background:   "transparent",
                border:       "none",
                cursor:       "pointer",
                display:      "flex",
                alignItems:   "center",
                transition:   "all .2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color      = "#ffffff";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color      = "rgba(255,255,255,0.7)";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              <Search style={{ width: "20px", height: "20px" }} />
            </button>
          )}

          <WishlistIcon count={wishlistCount} />
          <CartIcon     count={cartCount} />

          {!searchOpen && (
            <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />
          )}

          {user ? <UserAvatar /> : <AuthButtons />}
        </div>
      </div>
    </div>
  );
}