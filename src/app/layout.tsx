import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "বাংলাদেশের প্রতিদিনের বাজার দর — চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার আজকের দাম দেখুন এক জায়গায়।",
  keywords: ["বাজার দর", "বাজার দাম", "বাংলাদেশ", "চাল", "ডাল", "সবজি"],
  openGraph: {
    title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম",
    description: "বাংলাদেশের প্রতিদিনের বাজার দর এক নজরে",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#f0fdf4]" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "#14532d",
              border: "1px solid #86efac",
              fontFamily: "'Hind Siliguri', sans-serif",
              fontSize: "0.9rem",
            },
            success: {
              iconTheme: {
                primary: "#16a34a",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#dc2626",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
