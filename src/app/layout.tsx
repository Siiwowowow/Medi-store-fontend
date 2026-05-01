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
        <QueryProviders>
          <AuthProvider initialUser={user}>
            <TooltipProvider>
              <Navbar />
              <main>
                {children}
                <Toaster richColors position="top-right" />
                <ToastProvider />
              </main>
              <Footer />
            </TooltipProvider>
          </AuthProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
