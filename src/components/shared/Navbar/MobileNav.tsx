"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { useUser } from "@/hooks/useUser";
import Logo from "./Logo";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";
import AuthButtons from "./AuthButtons";
import UserAvatar from "./UserAvatar";
import { getDashboardRoute } from "./utils";
import type { NavLink, Category } from "./types";
import NavLinks from "./Navlinks ";
import SocialLogin from "../socialLogin/socialLogin";

interface Props {
  publicLinks: NavLink[];
  categories: Category[];
  cartCount?: number;
  wishlistCount?: number;
}

export default function MobileNav({
  publicLinks,
  categories,
  cartCount = 0,
  wishlistCount = 0,
}: Props) {
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const dashboardRoute = getDashboardRoute(user?.role);

  const allLinks: NavLink[] = [...publicLinks];
  if (user) {
    allLinks.push({
      label: "Dashboard",
      href: dashboardRoute,
      icon: LayoutDashboard,
    });
  }

  // 🔒 lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // ESC close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const toggleCategory = (label: string) => {
    setOpenCategory((prev) => (prev === label ? null : label));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    window.location.href = `/shop?search=${encodeURIComponent(
      searchQuery.trim()
    )}`;

    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="lg:hidden w-full border-b bg-white dark:bg-gray-950">
        <div className="flex items-center justify-between px-4 h-14">
          <Logo />

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Search className="w-5 h-5" />
            </button>

            <WishlistIcon count={wishlistCount} />
            <CartIcon count={cartCount} />

            {user && <UserAvatar />}

            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= BACKDROP ================= */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* ================= DRAWER ================= */}
      <aside
        className={`fixed top-0 left-0 h-full w-[88%] max-w-sm bg-white dark:bg-gray-950 z-50 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 h-14 border-b">
          <Logo />
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-3.5rem)]">

          {/* NAV LINKS */}
          <NavLinks
            links={allLinks}
            onLinkClick={() => setOpen(false)}
            orientation="vertical"
          />

          {/* ================= CATEGORIES ================= */}
          <div className="pt-4 border-t">
            <p className="text-xs font-semibold text-gray-400 mb-3 uppercase">
              Categories
            </p>

            <div className="space-y-1">
              {categories.map((cat) => {
                const isOpen = openCategory === cat.label;

                return (
                  <div key={cat.href} className="rounded-lg">
                    <button
                      onClick={() => toggleCategory(cat.label)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <span>{cat.icon || "📦"}</span>
                        {cat.label}
                      </div>

                      {cat.subcategories?.length ? (
                        isOpen ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )
                      ) : null}
                    </button>

                    {isOpen && cat.subcategories?.length ? (
                      <div className="ml-7 mt-1 space-y-1 border-l pl-3">
                        {cat.subcategories.map((sub) => (
                          <a
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className="block text-xs text-gray-600 dark:text-gray-300 hover:text-brand py-1"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= AUTH SECTION ================= */}
          {!user && (
            <div className="pt-5 border-t space-y-3">

              <p className="text-xs font-semibold text-gray-400 uppercase">
                Account
              </p>

              {/* LOGIN / SIGNUP */}
              <a
                href="/login"
                className="w-full flex justify-center py-2.5 rounded-xl bg-black text-white text-sm font-semibold"
              >
                Sign In
              </a>

              <a
                href="/register"
                className="w-full flex justify-center py-2.5 rounded-xl border text-sm font-semibold"
              >
                Create Account
              </a>

              {/* DIVIDER */}
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-[10px] text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* SOCIAL LOGIN */}
              <SocialLogin />
            </div>
          )}
        </div>
      </aside>

      {/* ================= SEARCH ================= */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
          <div className="w-[90%] max-w-md bg-white dark:bg-gray-900 rounded-xl p-5">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Search</h2>
              <button onClick={() => setSearchOpen(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSearch}>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines..."
                className="w-full border rounded-lg px-3 py-2"
                autoFocus
              />

              <button className="w-full mt-3 bg-black text-white py-2 rounded-lg">
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}