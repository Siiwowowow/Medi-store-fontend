"use client";

import CategoriesSection from '@/components/shared/Categories/CategoriesSection';
import HeroSection from '@/components/shared/Home Page/HeroSection';
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
      </div>
    </>
  )
}
