"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import { CertificateCard } from "../../components/CertificateCard";

type CertificateRecord = {
  email: string;
  name: string;
  certificateId: string;
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
    notFound();
  }

  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex justify-center">
          <CertificateCard
            name={certificate.name}
            certificateId={certificate.certificateId}
          />
        </div>
      </div>
    </main>
  );
}
