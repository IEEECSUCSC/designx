"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import PrimaryButton from "./ui/PrimaryButton";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!menuOpen) return;
      const target = event.target as Node | null;
      if (!target) return;
      if (!headerRef.current?.contains(target)) {
        setMenuOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (!menuOpen) return;
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-(--header-top-padding) z-50 flex w-full items-center justify-between px-2",
      )}
    >
      <div
        className={cn(
          "bg-background container mx-auto flex w-full items-center justify-between px-4 py-3 sm:px-5",
          "h-(--header-height)",
          "rounded-base shadow-base border",
        )}
      >
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
        {/* Mobile: dropdown on the right */}
        <div className="relative md:hidden">
          <button
            type="button"
            className="menu-button rounded px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </button>
          {menuOpen && (
            <>
              <div
                id={menuId}
                role="menu"
                aria-label="Site"
                className={cn(
                  "fixed inset-0 top-[calc(var(--header-height)+2rem)] mx-auto",
                  "h-[calc(100dvh-var(--header-height)-3rem)] w-[calc(100%-1rem)]",
                  "bg-background shadow-base rounded-base border-foreground z-5000 border p-6",
                  "flex flex-col items-center justify-center gap-2",
                )}
              >
                <button
                  type="button"
                  className="menu-close absolute top-4 right-4 p-2 text-2xl font-bold"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  ✕
                </button>
                <Link
                  role="menuitem"
                  className="menu-item"
                  href="/"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  role="menuitem"
                  className="menu-item"
                  href="/#about"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  role="menuitem"
                  className="menu-item"
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  role="menuitem"
                  href="/certificate"
                  onClick={() => setMenuOpen(false)}
                >
                  <PrimaryButton>Get Certificate</PrimaryButton>
                </Link>
              </div>
            </>
          )}
        </div>
        {/* Desktop: full nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium tracking-wide uppercase md:flex">
          <Link href="/" className="nav-link">
            Home
          </Link>
          {/* <Link href="/about" className="nav-link">About</Link> */}
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
          <Link href="/certificate">
            <PrimaryButton>Get Certificate</PrimaryButton>
          </Link>
        </nav>
      </div>
    </header>
  );
}
