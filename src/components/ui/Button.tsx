import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

// active: mirrors hover: so tapping on phones/tablets (which can't hover)
// still gets the same visible feedback as a mouse hover does.
const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-gold-400 text-ivory-50 hover:bg-gold-500 active:bg-gold-500",
  outline:
    "border border-gold-400 text-charcoal-900 hover:bg-gold-400 hover:text-ivory-50 active:bg-gold-400 active:text-ivory-50",
  ghost: "text-charcoal-900 hover:text-gold-500 active:text-gold-500",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 min-h-11 hover:-translate-y-0.5 active:translate-y-0 active:scale-95";

export function LinkButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
