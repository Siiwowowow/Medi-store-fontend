"use client";

import { motion } from "framer-motion";
import { Pill } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
      
      <div className="flex flex-col items-center gap-6">
        
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", repeatType: "reverse" }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-green-500/20 blur-2xl" />
          
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow-lg">
            <Pill className="w-10 h-10 text-green-600" />
          </div>
        </motion.div>

        {/* Spinner Ring */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
          <div className="absolute inset-0 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Loading...
          </h2>
          <p className="text-sm text-gray-500">
            Preparing your experience
          </p>
        </div>
      </div>
    </div>
  );
}