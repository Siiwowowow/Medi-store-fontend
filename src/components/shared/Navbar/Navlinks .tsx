"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath } from "./utils";
import type { NavLink } from "./types";

interface Props {
  links: NavLink[];
  onLinkClick?: () => void;
  orientation?: "horizontal" | "vertical";
}

export default function NavLinks({ links, onLinkClick, orientation = "horizontal" }: Props) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className={orientation === "horizontal" ? "flex items-center gap-0.5" : "flex flex-col gap-0.5"}
    >
      {links.map((link, i) => {
        const active = isActivePath(pathname, link.href);

        return orientation === "horizontal" ? (
          /* ── Desktop link ── */
          <Link
            key={`${link.href}-${i}`}
            href={link.href}
            onClick={onLinkClick}
            aria-current={active ? "page" : undefined}
            className="relative px-2 lg:px-3 py-2 text-[13px] lg:text-sm font-medium transition-colors whitespace-nowrap"
            style={{
              color: active ? "#ffffff" : "rgba(255,255,255,0.65)",
              fontFamily: "var(--font-poppins)",
            }}
            onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
            onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
          >
            {link.label}
            {/* Orange active underline */}
            {active && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-shop_orange" />
            )}
          </Link>
        ) : (
          /* ── Mobile link ── */
          <Link
            key={`${link.href}-${i}`}
            href={link.href}
            onClick={onLinkClick}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              active
                ? "bg-shop_light_pink text-shop_dark_green font-semibold"
                : "text-lightColor hover:bg-shop_light_bg hover:text-darkColor"
            }`}
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {link.icon && (
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                active ? "bg-shop_dark_green/10 text-shop_dark_green" : "bg-shop_light_bg text-lightColor"
              }`}>
                <link.icon className="w-4 h-4" />
              </span>
            )}
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}