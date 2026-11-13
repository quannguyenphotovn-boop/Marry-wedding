export function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
}: {
  kicker: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignClasses = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignClasses} max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
      <span className="section-kicker">{kicker}</span>
      <h2 className="mt-3 font-serif text-3xl md:text-4xl text-charcoal-900">{title}</h2>
      <span className="gold-rule mt-4" />
      {description && <p className="mt-4 text-charcoal-500 leading-relaxed">{description}</p>}
    </div>
  );
}
