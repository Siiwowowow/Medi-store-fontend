"use client";

import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import {

  Mail,
  Phone,
  MapPin,
  Pill,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <Pill className="text-brand" />
              MediStore
            </div>

            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              Your trusted online pharmacy. Get genuine medicines delivered to
              your doorstep safely and quickly.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-2 mt-3">

              <Link
                href="https://facebook.com"
                target="_blank"
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <IconBrandFacebook size={18} />
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <IconBrandInstagram size={18} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <IconBrandYoutube size={18} />
              </Link>
  
              <Link
                href="https://twitter.com"
                target="_blank"
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <IconBrandTwitter size={18} />
              </Link>
              
              
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <Link href="/" className="block hover:text-brand">Home</Link>
              <Link href="/shop" className="block hover:text-brand">Shop</Link>
              <Link href="/about" className="block hover:text-brand">About</Link>
              <Link href="/contact" className="block hover:text-brand">Contact</Link>
            </div>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <Link href="/category/pain-relief" className="block hover:text-brand">
                Pain Relief
              </Link>
              <Link href="/category/cold-flu" className="block hover:text-brand">
                Cold & Flu
              </Link>
              <Link href="/category/vitamins" className="block hover:text-brand">
                Vitamins
              </Link>
              <Link href="/category/skin-care" className="block hover:text-brand">
                Skin Care
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>

            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Dhaka, Bangladesh
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                +880 1XXX XXXXXX
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} />
                support@medistore.com
              </div>
            </div>
          </div>
        </div>

        {/* ================= NEWSLETTER ================= */}
        <div className="mt-10 border-t pt-5 flex flex-col md:flex-row items-center justify-between gap-2">

          <div>
            <h4 className="font-semibold">Subscribe to our newsletter</h4>
            <p className="text-sm text-gray-500">
              Get updates about medicines & offers
            </p>
          </div>

          <form className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <button className="px-4 py-2 bg-black text-white rounded-lg">
              Subscribe
            </button>
          </form>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-8 text-center text-xs text-gray-500 border-t pt-5">
          © {new Date().getFullYear()} MediStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}