import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="nav-shell mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3">
      <div className="flex items-center gap-3">
        <Link href="/" aria-label="DesignX Home">
          <Image
            src="/logo.png"
            alt="DesignX"
            width={92}
            height={36}
            priority
          />
        </Link>
      </div>

      <nav className="flex items-center gap-6 text-sm font-medium uppercase tracking-wide">
        <span className="nav-link">Home</span>
        <span className="nav-link">About</span>
        <span className="nav-link">Contact</span>
        <Link
          href="/verify"
          className="cta-button rounded px-6 py-2 text-white"
        >
          Verify
        </Link>
      </nav>
    </header>
  );
}
