"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PrimaryButton from "./ui/PrimaryButton";
import Link from "next/link";

type CertificateCardProps = {
  name: string;
  event: string;
  role: string;
  certificateId: string;
  issueDate: string;
};

export function CertificateCard({
  name,
  certificateId,
  issueDate,
}: CertificateCardProps) {
  const certificateRef = useRef<HTMLDivElement | null>(null);
  const certificateIdRef = useRef<HTMLDivElement | null>(null);

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
      <div
        ref={certificateRef}
        className="relative flex w-[100px] flex-row items-center justify-center xl:w-[1400px]"
        style={{
          aspectRatio: "1.414",
          maxWidth: "100%",
        }}
      >
        <img
          src="/new.png"
          alt="Certificate"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <div
          className="absolute text-center text-2xl font-semibold text-black"
          style={{
            top: "41%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
        <div
          className="absolute text-center font-sans text-sm text-black"
          style={{
            top: "82.6%",
            left: "51%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          {issueDate}
        </div>
        <div
          ref={certificateIdRef}
          className="absolute text-center font-sans text-sm text-black underline"
          style={{
            top: "86.2%",
            left: "53%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          {certificateId}
        </div>
      </div>

      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex gap-4">
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
