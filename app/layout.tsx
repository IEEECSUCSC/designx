import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import Header from "./components/Header";
import Image from "next/image";
import NavBar from "./components/NavBar";
import Watermark from "./components/ui/Watermark";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DesignX — Certificate Verification",
  description:
    "Official certificate verification page for the UI/UX Design Workshop (DesignX 2025).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}
      >
        <NuqsAdapter>
          <NavBar />

          <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#f3f3f3] text-[#0f0f0f]">
            <Watermark />

            {children}
          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
