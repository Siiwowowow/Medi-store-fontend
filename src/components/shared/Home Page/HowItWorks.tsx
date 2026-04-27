"use client";

import { Search, ShoppingCart, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Browse & Search",
    description: "Find medicines easily by name or category",
    color: "#fb6c08",
    bgColor: "#fef3e8",
  },
  {
    id: 2,
    icon: ShoppingCart,
    title: "Add to Cart",
    description: "Add items and checkout securely",
    color: "#3b9c3c",
    bgColor: "#e8f4f0",
  },
  {
    id: 3,
    icon: Truck,
    title: "Fast Delivery",
    description: "Delivered within 24-48 hours",
    color: "#063c28",
    bgColor: "#e8f0f8",
  },
];

// animation variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function HowItWorks() {
  return (
    <section className="py-12 md:py-16 bg-shop_light_pink">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold text-shop_light_green mb-2">
            SIMPLE & EASY
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-darkColor">
            How It Works
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Get medicines in 3 simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition relative text-center"
            >
              {/* Number */}
              <div className="mb-3">
                <div
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: step.bgColor, color: step.color }}
                >
                  {step.id}
                </div>
              </div>

              {/* Icon */}
              <div className="mb-3 flex justify-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: step.bgColor }}
                >
                  <step.icon
                    className="w-5 h-5"
                    style={{ color: step.color }}
                  />
                </div>
              </div>

              {/* Text */}
              <h3 className="text-base font-semibold text-darkColor mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-gray-500">
                {step.description}
              </p>

              {/* Arrow (desktop only) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4">
                  <ArrowRight className="w-4 h-4 text-[#063c2880]" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-lg bg-shop_dark_green text-white font-medium hover:gap-3 transition"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}