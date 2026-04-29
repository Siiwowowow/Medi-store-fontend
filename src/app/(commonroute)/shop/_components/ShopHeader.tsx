"use client";

export default function ShopHeader() {
  return (
    <div className="bg-gradient-to-r from-[#063c28] to-[#0a5c40] py-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-[#fcf0e4]/55 text-sm mb-2">
          Home / <span className="text-[#fcf0e4]">Shop</span>
        </div>
        <h1 className="text-white text-4xl font-bold Poppins">Medicine Shop</h1>
        <p className="text-[#fcf0e4]/65 mt-1 text-sm">Browse 10,000+ genuine OTC medicines</p>
      </div>
    </div>
  );
}