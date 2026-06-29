import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { ThemeProvider } from "@/components/ThemeProvider";
import IntroOverlay from "@/components/IntroOverlay";
import CustomCursor from "@/components/CustomCursor";
import ScrollProvider from "@/components/ScrollProvider";
import OnboardingModal from "@/components/OnboardingModal";
import CommandPalette from "@/components/CommandPalette";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sand AI — Smarter Marketing. Better Growth.",
  description: "Sand AI is your growth partner for the AI era. We blend data, creativity, and automation to build marketing that scales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-inter bg-sand-bg text-sand-textPrimary antialiased transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <IntroOverlay />
          <CustomCursor />
          <div className="grain-overlay" />
          
          {/* Architectural Background Grid Lines */}
          <div className="fixed inset-0 grid grid-cols-4 pointer-events-none z-0 max-w-7xl mx-auto px-6">
            <div className="border-r border-black/[0.03] dark:border-white/[0.03] h-full relative overflow-hidden">
              <div className="guide-line-streak streak-1" />
            </div>
            <div className="border-r border-black/[0.03] dark:border-white/[0.03] h-full relative overflow-hidden">
              <div className="guide-line-streak streak-2" />
            </div>
            <div className="border-r border-black/[0.03] dark:border-white/[0.03] h-full relative overflow-hidden">
              <div className="guide-line-streak streak-3" />
            </div>
            <div className="h-full relative overflow-hidden">
              <div className="guide-line-streak streak-4" />
            </div>
          </div>

          <ScrollProvider>
            <Navbar />
            {children}
            <FooterSection />
            <OnboardingModal />
            <CommandPalette />
          </ScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
