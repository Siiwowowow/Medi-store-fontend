"use client";

import TopBar from "./TopBar";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import type { NavbarProps } from "./types";
import { Home, Info, Phone, Pill } from "lucide-react";

// ✅ MediStore Public Links
const defaultPublicLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/shop", icon: Pill },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
];

// ✅ MediStore Categories
const defaultCategories = [
  {
    label: "💊 Pain Relief",
    href: "/category/pain-relief",
    subcategories: [
      { label: "Headache", href: "/category/pain-relief/headache" },
      { label: "Muscle Pain", href: "/category/pain-relief/muscle-pain" },
      { label: "Arthritis", href: "/category/pain-relief/arthritis" },
    ],
  },
  {
    label: "🤧 Cold & Flu",
    href: "/category/cold-flu",
    subcategories: [
      { label: "Cough Syrup", href: "/category/cold-flu/cough" },
      { label: "Fever", href: "/category/cold-flu/fever" },
      { label: "Sore Throat", href: "/category/cold-flu/sore-throat" },
    ],
  },
  {
    label: "💪 Vitamins",
    href: "/category/vitamins",
    subcategories: [
      { label: "Vitamin C", href: "/category/vitamins/vitamin-c" },
      { label: "Vitamin D", href: "/category/vitamins/vitamin-d" },
      { label: "Multivitamin", href: "/category/vitamins/multivitamin" },
    ],
  },
  {
    label: "🍽️ Digestive Health",
    href: "/category/digestive",
    subcategories: [
      { label: "Antacids", href: "/category/digestive/antacids" },
      { label: "Probiotics", href: "/category/digestive/probiotics" },
    ],
  },
  {
    label: "🩹 First Aid",
    href: "/category/first-aid",
    subcategories: [
      { label: "Bandages", href: "/category/first-aid/bandages" },
      { label: "Antiseptic", href: "/category/first-aid/antiseptic" },
    ],
  },
  {
    label: "🌿 Allergy",
    href: "/category/allergy",
    subcategories: [
      { label: "Antihistamines", href: "/category/allergy/antihistamines" },
      { label: "Nasal Sprays", href: "/category/allergy/nasal-sprays" },
    ],
  },
];

export default function Navbar({
  categories = defaultCategories,
  showTopBar = true,
}: NavbarProps) {
  const cartCount = 0;
  const wishlistCount = 0;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      {showTopBar && <TopBar />}

      <DesktopNav
        publicLinks={defaultPublicLinks}
        categories={categories}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      <MobileNav
        publicLinks={defaultPublicLinks}
        categories={categories}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
    </header>
  );
}