import NotFoundText from "@/app/components/ui/NotFoundText";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import Link from "next/link";


export default function NotFound() {
  return (
    <main className="page-height page-top-margin relative z-10 flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <NotFoundText>404</NotFoundText>
        <p className="text-muted-foreground max-w-md text-center text-xl">
          Certificate not found.
        </p>
        <Link href="/certificate">
          <PrimaryButton>Search Certificate</PrimaryButton>
        </Link>
      </div>
    </main>
  );
}
