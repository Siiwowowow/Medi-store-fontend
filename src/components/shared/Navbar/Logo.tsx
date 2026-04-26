import { Pill } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
      {/* Icon mark */}
      <div className="relative w-9 h-9 bg-shop_btn_dark_green rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
        <Pill className="w-5 h-5 text-white" strokeWidth={2.2} />
        <div className="absolute inset-0 rounded-xl bg-linear-to-br from-white/15 to-transparent pointer-events-none" />
      </div>

    
      <div className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Medi<span className="text-shop_orange">Store</span>
        </span>
        <span className="text-[9px] font-bold tracking-[.18em] uppercase text-shop_light_green leading-none mt-0.5">
          Pharmacy
        </span>
      </div>
    </Link>
  );
}