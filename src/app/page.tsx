"use client";

import CategoriesSection from '@/components/shared/Categories/CategoriesSection';
import BestSellingSection from '@/components/shared/Home Page/BestSelling';
import FaqSection from '@/components/shared/Home Page/FaqSection';
import HeroSection from '@/components/shared/Home Page/HeroSection';
import HowItWorks from '@/components/shared/Home Page/HowItWorks';
import PromoBanner from '@/components/shared/Home Page/PromoBanner';
import Testimonials from '@/components/shared/Home Page/Testimonials';
import { GoogleLoginSuccess } from '@/components/shared/socialLogin/GoogleLoginSuccess';
import React, { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <GoogleLoginSuccess/>
      </Suspense>
      <div>
        <HeroSection/>
        <CategoriesSection/>
        <BestSellingSection/>
        <HowItWorks/>
        <PromoBanner/>
        <Testimonials/>
        <FaqSection/>
      </div>
    </>
  )
}
