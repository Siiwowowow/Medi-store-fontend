/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight,
  Send,
  Heart,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import { Logo } from "../Navbar";

const socialLinks = [
  { name: "Facebook", icon: IconBrandFacebook, href: "https://facebook.com" },
  { name: "Twitter", icon: IconBrandTwitter, href: "https://twitter.com" },
  { name: "Instagram", icon: IconBrandInstagram, href: "https://instagram.com" },
  { name: "LinkedIn", icon: IconBrandLinkedin, href: "https://linkedin.com" },
  { name: "YouTube", icon: IconBrandYoutube, href: "https://youtube.com" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Shop", href: "/shop" },
  { name: "FAQs", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
];

const customerLinks = [
  { name: "My Account", href: "/profile" },
  { name: "Order History", href: "/orders" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "Track Order", href: "/track-order" },
  { name: "Support", href: "/support" },
];

const paymentMethods = ["Visa", "Mastercard", "Amex", "bKash", "Nagad", "Rocket"];

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  // Hide footer on dashboard pages
  const isDashboard = pathname?.startsWith("/admin") || 
                      pathname?.startsWith("/user") || 
                      pathname?.startsWith("/seller");

  if (isDashboard) {
    return null;
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1000);
  };

  const toggleMobileMenu = (menu: string) => {
    setOpenMobileMenu(openMobileMenu === menu ? null : menu);
  };

  return (
    <footer className="bg-shop_dark_green text-white mt-auto">
      {/* Main Footer */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Desktop Grid (hidden on mobile) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-3">
            <Logo />
            <p className="text-xs text-white/70 leading-relaxed">
              Trusted online pharmacy with 100% genuine medicines & fast delivery.
            </p>
            <div className="space-y-1.5">
              <ContactItem icon={Phone} text="+880 1234 56789" href="tel:+880123456789" />
              <ContactItem icon={Mail} text="support@medistore.com" href="mailto:support@medistore.com" />
              <ContactItem icon={MapPin} text="Dhaka, Bangladesh" />
              <ContactItem icon={Clock} text="Mon-Sat: 9AM - 9PM" />
            </div>
            <SocialLinks />
          </div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links" links={quickLinks} />
          
          {/* Customer Service */}
          <FooterColumn title="Customer Service" links={customerLinks} />

          {/* Newsletter & Payment */}
          <NewsletterSection 
            email={email}
            setEmail={setEmail}
            handleSubscribe={handleSubscribe}
            isLoading={isLoading}
            isSubscribed={isSubscribed}
            paymentMethods={paymentMethods}
          />
        </div>

        {/* Mobile Accordion Menu (visible on tablet/mobile) */}
        <div className="lg:hidden">
          {/* Brand & Social - Top Section */}
          <div className="text-center mb-6 pb-6 border-b border-white/10">
            <div className="flex justify-center mb-3">
              <Logo />
            </div>
            <p className="text-xs text-white/70 max-w-xs mx-auto">
              Trusted online pharmacy with 100% genuine medicines & fast delivery.
            </p>
            <div className="flex justify-center mt-4">
              <SocialLinks />
            </div>
          </div>

          {/* Accordion Menus */}
          <div className="space-y-2">
            <MobileAccordion 
              title="Quick Links" 
              links={quickLinks}
              isOpen={openMobileMenu === "quick"}
              onToggle={() => toggleMobileMenu("quick")}
            />
            <MobileAccordion 
              title="Customer Service" 
              links={customerLinks}
              isOpen={openMobileMenu === "customer"}
              onToggle={() => toggleMobileMenu("customer")}
            />
          </div>

          {/* Contact Info & Newsletter Combined */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="space-y-3 mb-4">
              <h3 className="text-sm font-semibold text-white">Contact Info</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <ContactItemSmall icon={Phone} text="+880 1234 56789" />
                <ContactItemSmall icon={Mail} text="support@medistore.com" />
                <ContactItemSmall icon={MapPin} text="Dhaka, Bangladesh" />
                <ContactItemSmall icon={Clock} text="Mon-Sat: 9AM-9PM" />
              </div>
            </div>

            <NewsletterSection 
              email={email}
              setEmail={setEmail}
              handleSubscribe={handleSubscribe}
              isLoading={isLoading}
              isSubscribed={isSubscribed}
              paymentMethods={paymentMethods}
              compact
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
            <p className="text-[11px] text-white/60">
              © {currentYear} MediStore. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-[11px]">
              <Link href="/privacy" className="text-white/60 hover:text-white transition">Privacy</Link>
              <span className="text-white/30">|</span>
              <Link href="/terms" className="text-white/60 hover:text-white transition">Terms</Link>
              <span className="text-white/30">|</span>
              <Link href="/cookies" className="text-white/60 hover:text-white transition">Cookies</Link>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-white/60">
              <Heart className="w-2.5 h-2.5 text-shop_orange" />
              <span>Made with care</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Reusable Components
function ContactItem({ icon: Icon, text, href }: { icon: any; text: string; href?: string }) {
  const content = (
    <>
      <Icon className="w-3.5 h-3.5 text-shop_orange shrink-0" />
      <span className="text-xs text-white/80">{text}</span>
    </>
  );
  
  if (href) {
    return (
      <a href={href} className="flex items-center gap-2 hover:opacity-80 transition">
        {content}
      </a>
    );
  }
  
  return <div className="flex items-center gap-2">{content}</div>;
}

function ContactItemSmall({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="w-3 h-3 text-shop_orange shrink-0" />
      <span className="text-[11px] text-white/70 truncate">{text}</span>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex gap-2">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-shop_orange flex items-center justify-center transition-all duration-200 hover:scale-105"
          aria-label={social.name}
        >
          <social.icon className="w-3.5 h-3.5 text-white" />
        </a>
      ))}
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: typeof quickLinks }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white mb-3">{title}</h3>
      <ul className="space-y-1.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-xs text-white/70 hover:text-white hover:pl-1 transition-all duration-200 inline-flex items-center gap-1 group"
            >
              <ChevronRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-all" />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileAccordion({ title, links, isOpen, onToggle }: { 
  title: string; 
  links: typeof quickLinks; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-3 text-left"
      >
        <span className="text-sm font-semibold text-white">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-white/60" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/60" />
        )}
      </button>
      {isOpen && (
        <div className="pb-3">
          <ul className="space-y-1.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-white/70 hover:text-white block py-0.5"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function NewsletterSection({ 
  email, 
  setEmail, 
  handleSubscribe, 
  isLoading, 
  isSubscribed,
  paymentMethods,
  compact = false
}: { 
  email: string;
  setEmail: (email: string) => void;
  handleSubscribe: (e: React.FormEvent) => void;
  isLoading: boolean;
  isSubscribed: boolean;
  paymentMethods: string[];
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div>
        <h3 className="text-sm font-semibold text-white mb-2">Newsletter</h3>
        <form onSubmit={handleSubscribe} className="mb-3">
          <div className="flex gap-1.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-shop_orange"
              required
              suppressHydrationWarning
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-3 py-1.5 bg-shop_orange text-white rounded-lg text-xs font-medium hover:bg-[#e05e06] transition-all disabled:opacity-50"
            >
              {isLoading ? "..." : isSubscribed ? "✓" : "Sub"}
            </button>
          </div>
        </form>
        <div>
          <p className="text-[11px] text-white/50 mb-1.5">We Accept</p>
          <div className="flex flex-wrap gap-1.5">
            {paymentMethods.slice(0, 4).map((method) => (
              <span key={method} className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-white/80">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-white mb-3">Newsletter</h3>
      <p className="text-xs text-white/70 mb-3">
        Get special offers & exclusive deals.
      </p>
      <form onSubmit={handleSubscribe} className="mb-4">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-shop_orange"
            required
            suppressHydrationWarning
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-shop_orange text-white rounded-lg text-sm font-medium hover:bg-[#e05e06] transition-all disabled:opacity-50 flex items-center gap-1"
          >
            {isLoading ? (
              "..."
            ) : isSubscribed ? (
              <>
                <Send className="w-3 h-3" />
                Done
              </>
            ) : (
              <>
                <Send className="w-3 h-3" />
                Sub
              </>
            )}
          </button>
        </div>
      </form>
      <div>
        <h3 className="text-xs font-semibold text-white mb-2">We Accept</h3>
        <div className="flex flex-wrap gap-1.5">
          {paymentMethods.map((method) => (
            <span key={method} className="px-2.5 py-1 bg-white/10 rounded text-[10px] text-white/80 font-medium">
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}