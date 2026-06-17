"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "Our Story" },
  { href: "/tenant", label: "Tenants" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-paper/85 border-cream-deep sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="group flex flex-col leading-none"
          onClick={() => setOpen(false)}
        >
          <span className="font-serif text-forest text-xl font-semibold tracking-tight">
            The Ever Company
          </span>
          <span className="eyebrow text-copper mt-1">Cleveland</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  active
                    ? "text-copper"
                    : "text-charcoal-soft hover:text-forest"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="bg-forest text-paper hover:bg-forest-deep rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Inquire
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-forest md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`bg-forest h-0.5 w-6 transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`bg-forest h-0.5 w-6 transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`bg-forest h-0.5 w-6 transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-cream-deep bg-paper border-t md:hidden">
          <div className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-charcoal hover:text-copper border-cream-deep/60 border-b py-3 text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
