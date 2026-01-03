"use client";

import { Suspense, useState } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { CertificateCard } from "../components/CertificateCard";
import HeaderText from "../components/ui/HeaderText";
import Label from "../components/ui/label";
import Input from "../components/ui/input";
import PrimaryButton from "../components/ui/PrimaryButton";
import Link from "next/link";

type CertificateRecord = {
  email: string;
  name: string;
  certificateId: string;
};

function VerifyCertificateContent() {
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
    <main className="page-height page-top-margin relative z-10 flex flex-col items-center justify-center px-4">
      <div className="container flex w-full flex-1 flex-col justify-between space-y-8 py-12">
        <div className="flex flex-col gap-y-6">
          <HeaderText>Verify your Certificate</HeaderText>
          <form onSubmit={handleSubmit} className="px-4a space-y-4">
            <div className="flex w-full flex-col space-y-1 lg:w-fit">
              <Label htmlFor="certificateId">Certificate ID</Label>
              <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-8">
                <Input
                  id="certificateId"
                  type="text"
                  value={certificateId}
                  onChange={(event) => setCertificateId(event.target.value)}
                  placeholder="DXH250001"
                  required
                />
                <PrimaryButton type="submit" disabled={loading}>
                  {loading ? "Checking..." : "Verify Certificate"}
                </PrimaryButton>
              </div>
            </div>
            {valid === false && error && (
              <p className="text-primary text-sm">Not a valid certificate.</p>
            )}
            {valid === true && (
              <p className="text-primary text-sm">Certificate is valid.</p>
            )}
          </form>
        </div>

        {certificate && (
          <div className="flex justify-center">
            <CertificateCard
              name={certificate.name}
              certificateId={certificate.certificateId}
            />
          </div>
        )}

        <div className="flex justify-end">
          <Link
            href="/certificate"
            className="underline underline-offset-2 hover:cursor-pointer"
          >
            Get Certificate
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function VerifyCertificatePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <VerifyCertificateContent />
    </Suspense>
  );
}
