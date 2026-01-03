import Image from "next/image";
import Link from "next/link";
import Sponsors from "./components/Sponsors";
import HeaderText from "./components/ui/HeaderText";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="relative z-20 container mx-auto mt-(--header-height) flex min-h-[calc(100vh-var(--header-height))] w-full flex-col items-center">
      <section className="_max-w-5xl relative flex w-full flex-1 flex-col items-center justify-center gap-y-4 px-2 pt-10 text-center lg:gap-y-8">
        <h1
          className={cn(
            "font-mono text-5xl leading-[0.9] font-semibold uppercase lg:text-9xl",
            "text-shadow-[4px_4px_0_#d8d8d8]",
          )}
        >
          UI/UX DESIGN
          <br />
          WORKSHOP
        </h1>

        <p className="body-copy _leading-5 text-foreground mx-auto max-w-3xl font-sans text-sm lg:text-lg">
          This is the official certificate verification page for the UI/UX
          Design Workshop organized by the IEEE Computer Society Student Branch
          - University of Colombo School of Computing (UCSC), with IFS as the
          Innovation Partner. Use this page to verify the authenticity of
          certificates issued for this workshop using the unique verification
          code provided on each certificate.
        </p>

        <div className="flex justify-center">
          <Link
            href="/certificate"
            className="primary-button inline-flex items-center justify-center rounded px-7 py-3 text-sm font-semibold text-white"
          >
            Get Your Certificate
          </Link>
        </div>

        <div className="pointer-events-none absolute top-24 left-8 hidden md:block">
          <Image
            src="/bot1.png"
            alt="Pixel bot"
            width={70}
            height={70}
            className="floating-icon"
          />
        </div>
        <div className="pointer-events-none absolute top-24 right-12 hidden md:block">
          <Image
            src="/bot2.png"
            alt="Pixel bot"
            width={74}
            height={74}
            className="floating-icon"
          />
        </div>
        <Sponsors />
      </section>
    </main>
  );
}
