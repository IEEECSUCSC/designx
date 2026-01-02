"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/ui/input";
import PrimaryButton from "../components/ui/PrimaryButton";
import Label from "../components/ui/label";
import HeaderText from "../components/ui/HeaderText";

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
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container h-full w-full flex-1 py-12">
        <div className="flex flex-col gap-6">
          <HeaderText>GET your Certificate</HeaderText>
          <form onSubmit={handleSubmit} className="flex gap-4 px-4">
            <div className="flex w-fit flex-col space-y-1">
              <Label htmlFor="email">Email</Label>
              <div className="flex gap-8">
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
      </div>
    </main>
  );
}
