import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Centered, max-width content wrapper used by every section. */
export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Small uppercase tracked label that introduces a section. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`eyebrow text-copper inline-flex items-center gap-3 ${className}`}>
      <span className="bg-copper/60 h-px w-8" aria-hidden />
      {children}
    </span>
  );
}

type ButtonVariant = "primary" | "outline" | "ghost";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-forest text-paper hover:bg-forest-deep",
  outline:
    "border border-forest/30 text-forest hover:border-forest hover:bg-forest hover:text-paper",
  ghost: "text-forest hover:text-copper",
};

/** Link styled as a button. */
export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: { variant?: ButtonVariant } & ComponentProps<typeof Link>) {
  return (
    <Link
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

/** Vertical rhythm wrapper for page sections. */
export function Section({
  className = "",
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}
