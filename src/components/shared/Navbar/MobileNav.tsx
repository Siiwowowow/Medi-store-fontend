/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu, X, LayoutDashboard,
  Search, ChevronDown, ChevronRight,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import Logo from "./Logo";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";
import UserAvatar from "./UserAvatar";
import { getDashboardRoute } from "./utils";
import type { NavLink, Category } from "./types";
import NavLinks from "./Navlinks";
import SocialLogin from "../socialLogin/socialLogin";

interface Props {
  publicLinks:    NavLink[];
  categories:     Category[];
  cartCount?:     number;
  wishlistCount?: number;
}

export default function MobileNav({
  publicLinks,
  categories,
  cartCount     = 0,
  wishlistCount = 0,
}: Props) {
  const { user } = useUser();

  const [open,         setOpen]         = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const dashRoute = getDashboardRoute(user?.role);
  const allLinks: NavLink[] = [
    ...publicLinks,
    ...(user ? [{ label: "Dashboard", href: dashRoute, icon: LayoutDashboard }] : []),
  ];

  // body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // ESC to close
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setSearchOpen(false); } };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* ════════════════ MOBILE TOP BAR ════════════════ */}
      <div
        className="md:hidden w-full"
        style={{ background: "#063c28" }}
      >
        <div
          className="flex items-center justify-between px-4"
          style={{ height: "60px" }}
        >
          <Logo />

          <div className="flex items-center gap-1">
            {/* Search */}
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
              }}
            >
              <Search style={{ width: "20px", height: "20px" }} />
            </button>

            <WishlistIcon />
            <CartIcon />
            {user && <UserAvatar />}

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              style={{
                marginLeft:   "4px",
                padding:      "10px",
                borderRadius: "8px",
                color:        "rgba(255,255,255,0.7)",
                background:   "transparent",
                border:       "none",
                cursor:       "pointer",
                display:      "flex",
                alignItems:   "center",
              }}
            >
              <Menu style={{ width: "20px", height: "20px" }} />
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════ OVERLAY ════════════════ */}
      <div
        onClick={() => setOpen(false)}
        className="md:hidden"
        style={{
          position:       "fixed",
          inset:          0,
          background:     "rgba(0,0,0,0.45)",
          backdropFilter: "blur(4px)",
          zIndex:         40,
          opacity:        open ? 1 : 0,
          pointerEvents:  open ? "auto" : "none",
          transition:     "opacity .3s ease",
        }}
      />

      {/* ════════════════ DRAWER ════════════════ */}
      <aside
        className="md:hidden"
        style={{
          position:   "fixed",
          top:        0,
          right:      0,
          height:     "100%",
          width:      "290px",
          background: "#ffffff",
          zIndex:     50,
          display:    "flex",
          flexDirection: "column",
          boxShadow:  "0 0 60px rgba(0,0,0,0.2)",
          transform:  open ? "translateX(0)" : "translateX(100%)",
          transition: "transform .3s cubic-bezier(.34,1.2,.64,1)",
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            padding:        "0 20px",
            height:         "60px",
            background:     "#063c28",
            flexShrink:     0,
          }}
        >
          <Logo />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              padding:      "8px",
              borderRadius: "8px",
              color:        "rgba(255,255,255,0.6)",
              background:   "transparent",
              border:       "none",
              cursor:       "pointer",
              display:      "flex",
              alignItems:   "center",
              transition:   "all .15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget).style.color = "#ffffff";
              (e.currentTarget).style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget).style.color = "rgba(255,255,255,0.6)";
              (e.currentTarget).style.background = "transparent";
            }}
          >
            <X style={{ width: "16px", height: "16px" }} />
          </button>
        </div>

        {/* Drawer search */}
        <div
          style={{
            padding:      "12px 16px",
            borderBottom: "1px solid #e5e7eb",
            flexShrink:   0,
          }}
        >
          <form
            onSubmit={handleSearch}
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          "8px",
              background:   "#f6f6f6",
              borderRadius: "12px",
              padding:      "0 14px",
              height:       "42px",
            }}
          >
            <Search style={{ width: "15px", height: "15px", color: "#52525b", flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicines..."
              style={{
                flex:        1,
                background:  "transparent",
                border:      "none",
                outline:     "none",
                fontSize:    "13px",
                color:       "#151515",
                fontFamily:  "var(--font-poppins)",
              }}
            />
          </form>
        </div>

        {/* Drawer scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>

          {/* NAV section label */}
          <p
            style={{
              padding:       "4px 12px 8px",
              fontSize:      "10px",
              fontWeight:    700,
              textTransform: "uppercase",
              letterSpacing: ".12em",
              color:         "#52525b",
              fontFamily:    "var(--font-poppins)",
            }}
          >
            Navigation
          </p>

          <NavLinks
            links={allLinks}
            onLinkClick={() => setOpen(false)}
            orientation="vertical"
          />

          {/* CATEGORIES section */}
          <div style={{ marginTop: "12px" }}>
            <p
              style={{
                padding:       "8px 12px 8px",
                fontSize:      "10px",
                fontWeight:    700,
                textTransform: "uppercase",
                letterSpacing: ".12em",
                color:         "#52525b",
                fontFamily:    "var(--font-poppins)",
              }}
            >
              Categories
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {categories.map((cat) => {
                const isOpen = openCategory === cat.label;
                return (
                  <div key={cat.href}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenCategory((prev) => (prev === cat.label ? null : cat.label))
                      }
                      style={{
                        width:          "100%",
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "space-between",
                        padding:        "10px 12px",
                        borderRadius:   "12px",
                        fontSize:       "13px",
                        fontWeight:     isOpen ? 600 : 500,
                        color:          isOpen ? "#063c28" : "#52525b",
                        background:     isOpen ? "#fcf0e4" : "transparent",
                        border:         "none",
                        cursor:         "pointer",
                        fontFamily:     "var(--font-poppins)",
                        textAlign:      "left",
                        transition:     "all .15s ease",
                      }}
                    >
                      <span>{cat.label}</span>
                      {cat.subcategories?.length ? (
                        isOpen
                          ? <ChevronDown style={{ width: "15px", height: "15px", color: "#063c28" }} />
                          : <ChevronRight style={{ width: "15px", height: "15px", color: "#52525b" }} />
                      ) : null}
                    </button>

                    {/* Subcategories */}
                    {isOpen && cat.subcategories?.length && (
                      <div
                        style={{
                          marginLeft:  "28px",
                          borderLeft:  "2px solid rgba(59,156,60,0.3)",
                          paddingLeft: "12px",
                          paddingBottom: "6px",
                        }}
                      >
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            style={{
                              display:        "flex",
                              alignItems:     "center",
                              gap:            "6px",
                              padding:        "6px 0",
                              fontSize:       "12px",
                              color:          "#52525b",
                              textDecoration: "none",
                              fontFamily:     "var(--font-poppins)",
                              transition:     "color .15s ease",
                            }}
                            onMouseEnter={(e) =>
                              ((e.currentTarget).style.color = "#063c28")
                            }
                            onMouseLeave={(e) =>
                              ((e.currentTarget).style.color = "#52525b")
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
                );
              })}
            </div>
          </div>
        </div>

        {/* ════ Drawer footer ════ */}
        {!user ? (
          <div
            style={{
              padding:      "16px",
              borderTop:    "1px solid #e5e7eb",
              flexShrink:   0,
              display:      "flex",
              flexDirection: "column",
              gap:          "8px",
            }}
          >
            <p
              style={{
                fontSize:      "10px",
                fontWeight:    700,
                textTransform: "uppercase",
                letterSpacing: ".12em",
                color:         "#52525b",
                marginBottom:  "4px",
                fontFamily:    "var(--font-poppins)",
              }}
            >
              Account
            </p>

            <Link
              href="/login"
              style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                padding:        "11px 0",
                borderRadius:   "12px",
                border:         "1.5px solid #063c28",
                color:          "#063c28",
                fontSize:       "13px",
                fontWeight:     600,
                textDecoration: "none",
                fontFamily:     "var(--font-poppins)",
                transition:     "all .15s ease",
              }}
            >
              Sign In
            </Link>

            <Link
              href="/register"
              style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                padding:        "11px 0",
                borderRadius:   "12px",
                background:     "#063d29",
                color:          "#ffffff",
                fontSize:       "13px",
                fontWeight:     600,
                textDecoration: "none",
                fontFamily:     "var(--font-poppins)",
                transition:     "background .15s ease",
              }}
            >
              Create Account
            </Link>

            <div
              style={{
                display:    "flex",
                alignItems: "center",
                gap:        "8px",
                marginTop:  "4px",
              }}
            >
              <div style={{ height: "1px", flex: 1, background: "#e5e7eb" }} />
              <span style={{ fontSize: "10px", color: "#52525b", fontWeight: 500 }}>OR</span>
              <div style={{ height: "1px", flex: 1, background: "#e5e7eb" }} />
            </div>

            <SocialLogin />
          </div>
        ) : (
          /* Logged-in user card */
          <div
            style={{
              padding:   "16px",
              borderTop: "1px solid #e5e7eb",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          "12px",
                padding:      "12px",
                borderRadius: "14px",
                background:   "#f6f6f6",
                border:       "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  width:          "40px",
                  height:         "40px",
                  borderRadius:   "50%",
                  background:     "#fcf0e4",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                  overflow:       "hidden",
                }}
              >
                {user.image ? (
                  <img src={user.image} alt={user.name ?? "User"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#063c28", fontFamily: "var(--font-poppins)" }}>
                    {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                  </span>
                )}
              </div>

              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#151515", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "var(--font-poppins)" }}>
                  {user.name ?? "User"}
                </p>
                <p style={{ fontSize: "11px", color: "#52525b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.email}
                </p>
              </div>

              <span
                style={{
                  fontSize:      "9px",
                  fontWeight:    700,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                  padding:       "3px 8px",
                  borderRadius:  "999px",
                  background:    "#fcf0e4",
                  color:         "#063c28",
                  flexShrink:    0,
                  fontFamily:    "var(--font-poppins)",
                }}
              >
                {user.role?.toLowerCase()}
              </span>
            </div>
          </div>
        )}
      </aside>

      {/* ════════════════ SEARCH MODAL ════════════════ */}
      {searchOpen && (
        <div
          className="md:hidden"
          style={{
            position:        "fixed",
            inset:           0,
            zIndex:          60,
            background:      "rgba(0,0,0,0.5)",
            display:         "flex",
            alignItems:      "flex-start",
            justifyContent:  "center",
            paddingTop:      "80px",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
        >
          <div
            style={{
              width:        "90%",
              maxWidth:     "440px",
              background:   "#ffffff",
              borderRadius: "20px",
              padding:      "24px",
              boxShadow:    "0 24px 48px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#151515", margin: 0, fontFamily: "var(--font-poppins)" }}>
                Search Medicines
              </h2>
              <button
                onClick={() => setSearchOpen(false)}
                style={{
                  padding:      "6px",
                  borderRadius: "8px",
                  background:   "#f6f6f6",
                  border:       "none",
                  cursor:       "pointer",
                  display:      "flex",
                  alignItems:   "center",
                }}
              >
                <X style={{ width: "14px", height: "14px", color: "#52525b" }} />
              </button>
            </div>

            <form onSubmit={handleSearch} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Paracetamol, Vitamin C..."
                autoFocus
                style={{
                  width:        "100%",
                  height:       "48px",
                  padding:      "0 16px",
                  border:       "1.5px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize:     "14px",
                  color:        "#151515",
                  fontFamily:   "var(--font-poppins)",
                  outline:      "none",
                  boxSizing:    "border-box",
                }}
                onFocus={(e) => {
                  (e.currentTarget).style.borderColor = "#3b9c3c";
                  (e.currentTarget).style.boxShadow   = "0 0 0 3px rgba(59,156,60,0.12)";
                }}
                onBlur={(e) => {
                  (e.currentTarget).style.borderColor = "#e5e7eb";
                  (e.currentTarget).style.boxShadow   = "none";
                }}
              />
              <button
                type="submit"
                style={{
                  width:        "100%",
                  height:       "48px",
                  background:   "#063d29",
                  color:        "#ffffff",
                  border:       "none",
                  borderRadius: "12px",
                  fontSize:     "14px",
                  fontWeight:   600,
                  cursor:       "pointer",
                  fontFamily:   "var(--font-poppins)",
                  transition:   "background .15s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget).style.background = "#052e1f")}
                onMouseLeave={(e) => ((e.currentTarget).style.background = "#063d29")}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}