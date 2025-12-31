import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/NavBar";
import Sponsors from "./components/Sponsors";

export default function Home() {
  return (
    <main className="site-shell px-5 pb-14 pt-6">
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

        <section className="relative mt-14 w-full max-w-5xl text-center">
          <h1 className="hero-title mx-auto text-[56px] sm:text-[92px]">
            UI/UX DESIGN
            <br />
            WORKSHOP
          </h1>

          <p className="body-copy mx-auto mt-8 max-w-3xl text-[12px] leading-5 text-zinc-800">
            This is the official certificate verification page for the UI/UX
            Design Workshop organized by the IEEE Computer Society Student
            Branch - University of Colombo School of Computing (UCSC), with IFS
            as the Innovation Partner. Use this page to verify the authenticity
            of certificates issued for this workshop using the unique
            verification code provided on each certificate.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/verify"
              className="primary-button inline-flex items-center justify-center rounded px-7 py-3 text-sm font-semibold text-white"
            >
              Verify Your Certificate
            </Link>
          </div>

          <div className="pointer-events-none absolute left-8 top-24 hidden md:block">
            <Image
              src="/bot1.png"
              alt="Pixel bot"
              width={70}
              height={70}
              className="floating-icon"
            />
          </div>
          <div className="pointer-events-none absolute right-12 top-24 hidden md:block">
            <Image
              src="/bot2.png"
              alt="Pixel bot"
              width={74}
              height={74}
              className="floating-icon"
            />
          </div>
        </section>

        <Sponsors />
      </div>
    </main>
  );
}
