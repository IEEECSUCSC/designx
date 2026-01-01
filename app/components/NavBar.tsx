"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

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
      className="nav-shell relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-5"
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

      {/* Mobile: dropdown in center */}
      <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
        <button
          type="button"
          className="menu-button rounded px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>

        {menuOpen && (
          <div id={menuId} role="menu" aria-label="Site" className="menu-panel">
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
          </div>
        )}
      </div>

      {/* Mobile: red button on right */}
      <div className="md:hidden">
        <Link
          href="/verify"
          className="cta-button rounded px-5 py-2 text-white"
        >
          Verify
        </Link>
      </div>

      {/* Desktop: full nav */}
      <nav className="hidden items-center gap-6 text-sm font-medium uppercase tracking-wide md:flex">
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
