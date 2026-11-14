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
  const titleSize =
    size === "lg" ? "text-3xl sm:text-4xl md:text-5xl" : "text-base sm:text-xl md:text-2xl";

  return (
    <Link href="/" className="inline-flex flex-col items-start group">
      {/* Wide letter-spacing (tracking-widest2) only kicks in from md: at
          narrower widths it alone pushed "MARRY WEDDING" past the viewport
          edge next to the mobile nav's hamburger button. */}
      <span
        className={`font-serif ${titleSize} tracking-wide md:tracking-widest2 ${textColor} transition-colors group-hover:text-gold-400 group-active:text-gold-400 whitespace-nowrap`}
      >
        MARRY WEDDING
      </span>
      <span className="gold-rule mt-1 origin-left scale-x-100 transition-transform duration-300 group-hover:scale-x-150 group-active:scale-x-150" />
      <span
        className={`mt-1 text-[9px] sm:text-[10px] uppercase tracking-normal md:tracking-widest2 ${subColor} whitespace-nowrap`}
      >
        Luxury Wedding Studio
      </span>
    </Link>
  );
}
