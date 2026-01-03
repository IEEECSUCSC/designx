import Image from "next/image";
import Link from "next/link";
import Sponsors from "./components/Sponsors";

export default function Home() {
  return (
    <main className="container mx-auto mt-(--header-height) flex min-h-[calc(100vh-var(--header-height))] w-full flex-col items-center">
      <section className="relative flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-y-4 px-2 pt-10 text-center lg:gap-y-8">
        <h1 className="hero-title mx-auto text-[56px] sm:text-[92px]">
          UI/UX DESIGN
          <br />
          WORKSHOP
        </h1>

        <p className="body-copy mx-auto max-w-3xl text-[12px] leading-5 text-zinc-800">
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
