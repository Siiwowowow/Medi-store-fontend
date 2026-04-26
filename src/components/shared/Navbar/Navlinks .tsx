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

export default function NavLinks({
  links,
  onLinkClick,
  orientation = "horizontal",
}: Props) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className={
        orientation === "horizontal"
          ? "flex items-center gap-0.5"
          : "flex flex-col gap-0.5"
      }
    >
      {links.map((link, index) => {
        const active = isActivePath(pathname, link.href);
        return (
          <Link
            key={`${link.href}-${index}`}
            href={link.href}
            onClick={onLinkClick}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              active
                ? "bg-primary/10 text-primary"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {link.icon && <link.icon className="w-3.5 h-3.5 flex-shrink-0" />}
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}