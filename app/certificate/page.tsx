"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/ui/input";
import PrimaryButton from "../components/ui/PrimaryButton";
import Label from "../components/ui/label";
import HeaderText from "../components/ui/HeaderText";
import Link from "next/link";

type CertificateRecord = {
  email: string;

  name: string;
  event: string;
  role: string;
  certificateId: string;
  issueDate: string;
};

export default function CertificateLookupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Certificate not found.");
        setLoading(false);
        return;
      }

      const certificate = data.certificate as CertificateRecord;
      // Redirect to certificate display page
      router.push(
        `/certificate/${encodeURIComponent(certificate.certificateId)}`,
      );
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="page-height page-top-margin relative z-20 flex flex-col items-center justify-center">
      <div className="container flex h-full w-full flex-1 flex-col justify-between px-4 py-12 lg:px-0">
        <div className="flex flex-col gap-6">
          <HeaderText>GET your Certificate</HeaderText>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex w-full flex-col space-y-1 lg:w-fit">
              <Label htmlFor="email">Email</Label>
              <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-8">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  required
                />

                <PrimaryButton type="submit" disabled={loading}>
                  {loading ? "Searching..." : "Find Certificate"}
                </PrimaryButton>
              </div>
            </div>

            {/* {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )} */}
          </form>
        </div>
        <div className="flex justify-end">
          <Link
            href="/verify"
            className="underline underline-offset-2 hover:cursor-pointer"
          >
            Verify Certificate
          </Link>
        </div>
      </div>
    </main>
  );
}
