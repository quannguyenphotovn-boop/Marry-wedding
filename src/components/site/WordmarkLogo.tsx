import Link from "next/link";

interface WordmarkLogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "lg";
}

/**
 * Placeholder logo: a serif wordmark + thin gold rule. No real logo file
 * exists yet. Swap this component's internals for an <Image> once a real
 * logo is designed — every other place in the app renders <WordmarkLogo />,
 * never the raw text, so the swap happens in exactly one file.
 */
export function WordmarkLogo({ variant = "dark", size = "sm" }: WordmarkLogoProps) {
  const textColor = variant === "dark" ? "text-charcoal-900" : "text-ivory-50";
  const subColor = variant === "dark" ? "text-charcoal-500" : "text-ivory-200";
  const titleSize = size === "lg" ? "text-4xl md:text-5xl" : "text-xl md:text-2xl";

  return (
    <Link href="/" className="inline-flex flex-col items-start group">
      <span
        className={`font-serif ${titleSize} tracking-widest2 ${textColor} group-hover:text-gold-400 transition-colors`}
      >
        MARRY WEDDING
      </span>
      <span className="gold-rule mt-1" />
      <span className={`mt-1 text-[10px] uppercase tracking-widest2 ${subColor}`}>
        Luxury Wedding Studio
      </span>
    </Link>
  );
}
