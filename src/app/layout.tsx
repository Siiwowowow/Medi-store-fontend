import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProviders from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Toaster } from "sonner";
import { getUserInfo } from "@/services/auth.services";
import Footer from "@/components/shared/Footer/Footer";
import { ToastProvider } from "@/providers/ToastProvider";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MediStore",
  description: "Trusted Pharmacy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfo();

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-poppins antialiased">
        <Suspense fallback={null}>
          <NextTopLoader color="#fb6c08" showSpinner={false} />
        </Suspense>
        <QueryProviders>
          <AuthProvider initialUser={user}>
            <TooltipProvider>
              <Suspense fallback={<div className="h-16" />}>
                <Navbar />
              </Suspense>
              <main className="flex-1">
                {children}
                <Toaster richColors position="top-right" />
                <ToastProvider />
              </main>
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </TooltipProvider>
          </AuthProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
