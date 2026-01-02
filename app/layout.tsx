import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import Header from "./components/Header";
import Image from "next/image";
import NavBar from "./components/NavBar";

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
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#f3f3f3] px-5 pb-14 pt-6 text-[#0f0f0f]">
                    <Image
                        src="/left_side_watermark.png"
                        alt="DesignX watermark"
                        width={620}
                        height={960}
                        className="site-watermark"
                        priority
                    />

                    <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
                        <NavBar />
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
