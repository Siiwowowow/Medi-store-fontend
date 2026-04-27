/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "How do I place an order on MediStore?",
      answer:
        "Browse products, add to cart, go to checkout, enter your details and confirm your order.",
    },
    {
      question: "Do I need a prescription?",
      answer:
        "OTC medicines don't require prescription. Prescription medicines require valid doctor prescription.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "24-48 hours inside major cities, 2-4 days outside cities.",
    },
    {
      question: "What payment methods are available?",
      answer:
        "We support Cash on Delivery, bKash, Nagad and debit/credit cards.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4">

        {/* LEFT IMAGE (YOUR STYLE) */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-[300px] md:h-[420px] rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
              alt="FAQ"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover h-auto max-w-xl max-h-xl"
              priority
            />
          </div>
        </div>

        {/* RIGHT FAQ */}
        <div className="w-full md:w-1/2">

          <p className="text-[#3b9c3c] text-sm font-semibold mb-2">
            FAQ's
          </p>

          <h2 className="text-3xl font-bold mb-3">
            Looking for answers?
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Everything you need to know about ordering medicines from MediStore.
          </p>

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-b border-gray-200 py-4 cursor-pointer"
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
              >
                {/* Question */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-[#151515]">
                    {faq.question}
                  </h3>

                  <ChevronDown
                    className={`w-5 h-5 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-[#fb6c08]" : "text-gray-500"
                    }`}
                  />
                </div>

                {/* Answer */}
                <p
                  className={`text-sm text-gray-500 transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "opacity-100 max-h-[200px] pt-3"
                      : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}