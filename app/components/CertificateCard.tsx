"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PrimaryButton from "./ui/PrimaryButton";
import Link from "next/link";

type CertificateCardProps = {
  name: string;
  certificateId: string;
};

export function CertificateCard({ name, certificateId }: CertificateCardProps) {
  const certificateRef = useRef<HTMLDivElement | null>(null);
  const certificateIdRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const a4WidthPx = 3508 / 1.5;
    const a4HeightPx = 2480 / 1.5;

    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = a4WidthPx;
    outputCanvas.height = a4HeightPx;
    const ctx = outputCanvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(canvas, 0, 0, a4WidthPx, a4HeightPx);
    }

    const imgData = outputCanvas.toDataURL("image/png", 1.0);

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = 297;
    const pdfHeight = 210;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Dynamic link positioning matching the element's actual position
    if (certificateIdRef.current && certificateRef.current) {
      const containerRect = certificateRef.current.getBoundingClientRect();
      const idRect = certificateIdRef.current.getBoundingClientRect();

      // Calculate relative position and size in %
      const relX = (idRect.left - containerRect.left) / containerRect.width;
      const relY = (idRect.top - containerRect.top) / containerRect.height;
      const relWidth = idRect.width / containerRect.width;
      const relHeight = idRect.height / containerRect.height;

      // Map to PDF coordinates (mm)
      const linkX = relX * pdfWidth;
      const linkY = relY * pdfHeight;
      const linkW = relWidth * pdfWidth;
      const linkH = relHeight * pdfHeight;

      const verificationUrl = `${window.location.origin}/verify?id=${certificateId}`;

      pdf.link(linkX, linkY, linkW, linkH, { url: verificationUrl });
    }

    pdf.save(`${name}_certificate.pdf`);
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-clip px-4 lg:mt-6 lg:gap-y-8 lg:py-8">
      {!isLoaded && (
        <div className="flex h-[200px] w-full items-center justify-center text-sm font-medium text-zinc-500">
          Loading certificate...
        </div>
      )}
      <div
        ref={certificateRef}
        className={`relative flex w-[1000px] flex-row items-center justify-center lg:scale-90 xl:w-[1400px] ${
          !isLoaded ? "hidden" : ""
        }`}
        style={{
          aspectRatio: "1.414",
          maxWidth: "100%",
        }}
      >
        <img
          src="/email-template.png"
          alt="Certificate"
          onLoad={() => setIsLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        {isLoaded && (
          <>
            <div
              className="_font-sans absolute flex flex-row flex-nowrap items-center justify-center text-2xl font-semibold text-black lg:text-4xl"
              style={{
                top: "41%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                whiteSpace: "nowrap",
              }}
            >
              {name.split(" ").map((word, i, arr) => (
                <span
                  key={i}
                  className={i < arr.length - 1 ? "mr-[0.4em] lg:mr-7" : ""}
                >
                  {word}
                </span>
              ))}
            </div>
            <div
              ref={certificateIdRef}
              className="absolute text-center font-sans text-sm text-black underline lg:text-base"
              style={{
                top: "86.5%",
                left: "33.5%",
                transform: "translate(-50%, -50%)",
                whiteSpace: "nowrap",
              }}
            >
              {certificateId}
            </div>
          </>
        )}
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-4 py-2 lg:flex-row lg:items-start">
        <div className="flex flex-col gap-4 lg:flex-row">
          <PrimaryButton
            onClick={handleDownload}
            className="mt-4 rounded-2xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Download Certificate
          </PrimaryButton>
          {/* verify link */}
          <Link href={`/verify?id=${certificateId}`}>
            <PrimaryButton>Verify Certificate</PrimaryButton>
          </Link>
        </div>
        <Link href={`/certificate`}>
          <PrimaryButton>Search Another Certificate</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
