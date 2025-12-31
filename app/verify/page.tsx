"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavBar from "../components/NavBar";
import Sponsors from "../components/Sponsors";

export default function VerifyPage() {
  const router = useRouter();
  const [certificateId, setCertificateId] = useState("");

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

        <section className="relative mt-16 w-full max-w-5xl">
          <h1 className="hero-title text-center text-[56px] sm:text-[92px]">
            VERIFY YOUR
            <br />
            CERTIFICATE
          </h1>

          <form
            className="mx-auto mt-14 flex w-full max-w-xl items-end justify-center gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              const id = certificateId.trim();
              if (!id) return;
              router.push(`/certificate?id=${encodeURIComponent(id)}`);
            }}
          >
            <label className="block w-full max-w-[320px]">
              <span className="mb-2 block text-xs font-semibold text-zinc-900">
                Certificate ID
              </span>
              <input
                className="field h-10 w-full px-3 text-sm outline-none"
                placeholder="Enter your certificate ID here"
                value={certificateId}
                onChange={(event) => setCertificateId(event.target.value)}
              />
            </label>

            <button
              type="submit"
              className="primary-button h-10 rounded px-8 text-sm font-semibold text-white"
            >
              Verify
            </button>
          </form>

          <div className="pointer-events-none absolute right-10 top-24 hidden md:block">
            <Image
              src="/bot1.png"
              alt="Pixel bot"
              width={70}
              height={70}
              className="floating-icon"
            />
          </div>
          <div className="pointer-events-none absolute right-52 bottom-16 hidden md:block">
            <Image
              src="/bot2.png"
              alt="Pixel bot"
              width={78}
              height={78}
              className="floating-icon"
            />
          </div>
        </section>

        <Sponsors />
      </div>
    </main>
  );
}
