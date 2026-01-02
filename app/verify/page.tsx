"use client";

import { useState } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { CertificateCard } from "../components/CertificateCard";
import HeaderText from "../components/ui/HeaderText";
import Label from "../components/ui/label";
import Input from "../components/ui/input";
import PrimaryButton from "../components/ui/PrimaryButton";

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
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="container w-full flex-1 space-y-8 py-12">
        <div className="">
          <HeaderText>Verify your Certificate</HeaderText>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex w-fit flex-col space-y-1">
            <Label htmlFor="certificateId">Certificate ID</Label>
            <div className="flex gap-8">
              <Input
                id="certificateId"
                type="text"
                value={certificateId}
                onChange={(event) => setCertificateId(event.target.value)}
                placeholder="DXH25-0001"
                required
              />
              <PrimaryButton type="submit" disabled={loading}>
                {loading ? "Checking..." : "Verify Certificate"}
              </PrimaryButton>
            </div>
          </div>

          {valid === false && error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          {valid === true && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Certificate is valid.
            </p>
          )}
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
