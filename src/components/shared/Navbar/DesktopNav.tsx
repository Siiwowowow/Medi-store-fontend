"use client";

import { useUser } from "@/hooks/useUser";
import { LayoutDashboard } from "lucide-react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CategoryMenu from "./CategoryMenu";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";
import AuthButtons from "./AuthButtons";
import UserAvatar from "./UserAvatar";
import { getDashboardRoute } from "./utils";
import type { NavLink, Category } from "./types";
import NavLinks from "./Navlinks ";

interface Props {
  publicLinks: NavLink[];
  categories: Category[];
  cartCount?: number;
  wishlistCount?: number;
}

export default function DesktopNav({
  publicLinks,
  categories,
  cartCount = 0,
  wishlistCount = 0,
}: Props) {
  const { user } = useUser();
  const dashboardRoute = getDashboardRoute(user?.role);

  const navLinks: NavLink[] = [...publicLinks];
  
  if (user) {
    navLinks.push({ label: "Dashboard", href: dashboardRoute, icon: LayoutDashboard });
  }

  return (
    <div className="hidden md:block w-full">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        
        {/* Left Section: Logo + Category Menu + Nav Links */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Logo />
          
          {categories.length > 0 && (
            <>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
              <CategoryMenu categories={categories} />
            </>
          )}
          
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
          
          <div className="flex items-center gap-0.5 overflow-x-auto">
            <NavLinks links={navLinks} orientation="horizontal" />
          </div>
        </div>

        {/* Right Section: Search + Icons + Auth */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-64">
            <SearchBar />
          </div>
          
          <WishlistIcon count={wishlistCount} />
          <CartIcon count={cartCount} />
          
          {user ? (
            <div className="ml-1">
              <UserAvatar />
            </div>
          ) : (
            <div className="ml-1">
              <AuthButtons />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}