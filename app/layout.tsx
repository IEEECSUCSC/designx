import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
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
  metadataBase: new URL("https://designx.ieeecsucsc.org"),
  title: {
    default: "DesignX — UI/UX Design Workshop",
    template: "%s | DesignX",
  },
  description:
    "DesignX is the premier UI/UX design workshop organized by IEEE Computer Society Student Branch of UCSC. Master the art of user experience and interface design.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://designx.ieeecsucsc.org",
    siteName: "DesignX 2025",
    title: "DesignX — UI/UX Design Workshop",
    description:
      "DesignX is the premier UI/UX design workshop organized by IEEE Student Branch of UCSC.",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "DesignX Workshop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DesignX — UI/UX Design Workshop",
    description:
      "DesignX is the premier UI/UX design workshop organized by IEEE Student Branch of UCSC.",
    images: ["/og-image.png"],
  },
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
