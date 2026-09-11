import type { CustomSection } from "../lib/types";

export default function CustomSections({ sections }: { sections: CustomSection[] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((s, i) => (
        <section key={i} className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20 border-t border-line">
          <h2 className="font-display text-3xl sm:text-4xl text-ink mb-5">{s.title as string}</h2>
          <p className="text-[15px] leading-relaxed text-muted whitespace-pre-line">{s.body as string}</p>
        </section>
      ))}
    </>
  );
}
