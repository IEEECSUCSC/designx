"use client";

import { useState } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { CertificateCard } from "../components/CertificateCard";

type CertificateRecord = {
  email: string;
  contactNumber: string;
  name: string;
  event: string;
  role: string;
  certificateId: string;
  issueDate: string;
};

export default function VerifyCertificatePage() {
  const [certificateId, setCertificateId] = useQueryState(
    "id",
    parseAsString.withDefault(""),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [valid, setValid] = useState<boolean | null>(null);
  const [certificate, setCertificate] = useState<CertificateRecord | null>(
    null,
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setCertificate(null);
    setValid(null);

    if (!certificateId.trim()) {
      setError("Please enter a Certificate ID.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certificateId }),
      });

      const data = await response.json();

      if (!response.ok || !data.valid) {
        setValid(false);
        setError(data.error ?? "Certificate not found.");
        return;
      }

      setValid(true);
      setCertificate(data.certificate as CertificateRecord);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="w-full max-w-xl space-y-8">
        <header className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Verify a Certificate
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Enter the Certificate ID to verify the authenticity of a DesignX
            Hackathon certificate.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="space-y-2">
            <label
              htmlFor="certificateId"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Certificate ID
            </label>
            <input
              id="certificateId"
              type="text"
              value={certificateId}
              onChange={(event) => setCertificateId(event.target.value)}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-zinc-900/10 focus:border-zinc-900 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              placeholder="DXH25-0001"
              required
            />
          </div>

          {valid === false && error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          {valid === true && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Certificate is valid.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            {loading ? "Checking..." : "Verify Certificate"}
          </button>
        </form>

        {certificate && (
          <div className="flex justify-center">
            <CertificateCard
              name={certificate.name}
              event={certificate.event}
              role={certificate.role}
              certificateId={certificate.certificateId}
              issueDate={certificate.issueDate}
            />
          </div>
        )}
      </div>
    </main>
  );
}
