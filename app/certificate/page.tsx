"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CertificateRecord = {
  email: string;
  contactNumber: string;
  name: string;
  event: string;
  role: string;
  certificateId: string;
  issueDate: string;
};

export default function CertificateLookupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !contactNumber.trim()) {
      setError("Please enter your email and contact number.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contactNumber }),
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="w-full max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            View Your Certificate
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Enter the email and contact number you used to register for the
            hackathon to view your e-certificate.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-zinc-900/10 focus:border-zinc-900 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="contact"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Contact number
            </label>
            <input
              id="contact"
              type="text"
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-zinc-900/10 focus:border-zinc-900 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              placeholder="+9471XXXXXXX"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            {loading ? "Searching..." : "Find Certificate"}
          </button>
        </form>
      </div>
    </main>
  );
}
