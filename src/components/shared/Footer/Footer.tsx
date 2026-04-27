"use client";

import { useState } from "react";
import Link from "next/link";

import { 
  
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight,
  Pill,
  Send,
  Heart
} from "lucide-react";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import { Logo } from "../Navbar";

const socialLinks = [
  { name: "Facebook", icon: IconBrandFacebook, href: "https://facebook.com", color: "#1877F2" },
  { name: "Twitter", icon: IconBrandTwitter, href: "https://twitter.com", color: "#1DA1F2" },
  { name: "Instagram", icon: IconBrandInstagram, href: "https://instagram.com", color: "#E4405F" },
  { name: "LinkedIn", icon: IconBrandLinkedin, href: "https://linkedin.com", color: "#0A66C2" },
  { name: "YouTube", icon: IconBrandYoutube, href: "https://youtube.com", color: "#FF0000" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Shop", href: "/shop" },
  { name: "FAQs", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Shipping Info", href: "/shipping" },
  { name: "Return Policy", href: "/returns" },
];

const customerLinks = [
  { name: "My Account", href: "/profile" },
  { name: "Order History", href: "/orders" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "Cart", href: "/cart" },
  { name: "Track Order", href: "/track-order" },
  { name: "Support", href: "/support" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1000);
  };

  return (
    <footer className="bg-shop_dark_green text-white mt-auto">
      

      {/* Main Footer */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              
              <Logo/>
            </div>
            <p className="text-sm text-white leading-relaxed">
              Your trusted online medicine shop. We provide 100% genuine medicines with fast delivery and 24/7 support.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-shop_orange shrink-0" />
                <a href="tel:+880123456789" className="text-white hover:text-white transition-colors">
                  +880 1234 56789
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-shop_orange shrink-0" />
                <a href="mailto:support@medistore.com" className="text-white hover:text-white transition-colors">
                  support@medistore.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-shop_orange shrink-0" />
                <span className="text-white">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-shop_orange shrink-0" />
                <span className="text-white">Mon-Sat: 9AM - 9PM</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-9 h-9 rounded-full bg-white/10 hover:bg-shop_orange flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 text-white group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {customerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Payment Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-white mb-3">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-900 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-shop_orange focus:border-transparent transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2.5 bg-shop_orange text-white rounded-xl text-sm font-medium hover:bg-[#e05e06] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    "Sending..."
                  ) : isSubscribed ? (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Payment Methods */}
            <div>
              <h3 className="text-white font-semibold text-base mb-3">We Accept</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white">Visa</span>
                <span className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white">Mastercard</span>
                <span className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white">Amex</span>
                <span className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white">bKash</span>
                <span className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white">Nagad</span>
                <span className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white">Rocket</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-xs text-white">
              &copy; {currentYear} MediStore. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link href="/privacy" className="text-white hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="text-white">|</span>
              <Link href="/terms" className="text-white hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span className="text-white">|</span>
              <Link href="/cookies" className="text-white hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
            <div className="flex items-center gap-1 text-xs text-white">
              <Heart className="w-3 h-3 text-shop_orange" />
              <span>Made with care</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}