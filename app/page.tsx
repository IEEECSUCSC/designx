export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="w-full max-w-3xl space-y-10 text-center">
        <section className="space-y-4">
          <p className="text-sm font-medium tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
            DESIGNX HACKATHON
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            DesignX Hackathon Certificates
          </h1>
          <p className="mx-auto max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
            Use this portal to view your DesignX Hackathon participation
            certificate or verify the authenticity of a certificate using its
            ID.
          </p>
        </section>

        <section className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/certificate"
            className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-50 transition hover:bg-zinc-800 sm:w-auto dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            View Your Certificate
          </a>
          <a
            href="/verify"
            className="inline-flex w-full items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 sm:w-auto dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Verify a Certificate
          </a>
        </section>
      </div>
    </main>
  );
}
