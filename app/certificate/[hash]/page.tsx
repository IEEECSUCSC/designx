"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CertificateCard } from "../../components/CertificateCard";

type CertificateRecord = {
  email: string;
  contactNumber: string;
  name: string;
  event: string;
  role: string;
  certificateId: string;
  issueDate: string;
};

export default function CertificateDisplayPage() {
  const params = useParams();
  const router = useRouter();
  const hash = params?.hash as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [certificate, setCertificate] = useState<CertificateRecord | null>(
    null,
  );

  useEffect(() => {
    if (!hash) {
      setError("Invalid certificate ID.");
      setLoading(false);
      return;
    }

    async function fetchCertificate() {
      try {
        const response = await fetch(
          `/api/certificate/${encodeURIComponent(hash)}`,
        );

        if (!response.ok) {
          const data = await response.json();
          setError(data.error ?? "Certificate not found.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setCertificate(data.certificate as CertificateRecord);
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchCertificate();
  }, [hash]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Loading certificate...
          </p>
        </div>
      </main>
    );
  }

  if (error || !certificate) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Certificate Not Found
            </h1>
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
          <Link
            href="/certificate"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Back to Certificate Search
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex justify-center">
          <CertificateCard
            name={certificate.name}
            event={certificate.event}
            role={certificate.role}
            certificateId={certificate.certificateId}
            issueDate={certificate.issueDate}
          />
        </div>
        <div className="text-center">
          <Link
            href="/certificate"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Search Another Certificate
          </Link>
        </div>
      </div>
    </main>
  );
}
