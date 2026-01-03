import Link from "next/link";
import PrimaryButton from "./components/ui/PrimaryButton";
import NotFoundText from "./components/ui/NotFoundText";

export default function NotFound() {
  return (
    <main className="page-height page-top-margin relative z-10 flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <NotFoundText>404</NotFoundText>
        <p className="text-muted-foreground max-w-md text-center">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been removed, renamed, or doesn&apos;t exist.
        </p>
        <Link href="/">
          <PrimaryButton>Go Back Home</PrimaryButton>
        </Link>
      </div>
    </main>
  );
}
