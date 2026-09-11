import type { SiteContent } from "../lib/types";
import EndpointLabel from "./EndpointLabel";

export default function Experience({
  experience,
  certifications,
  achievements,
}: {
  experience: SiteContent["experience"];
  certifications?: SiteContent["certifications"];
  achievements?: SiteContent["achievements"];
}) {
  return (
    <section id="experience" className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <EndpointLabel method="GET" path="/experience" title="Experience" />

      <div className="space-y-10">
        {experience.map((e, i) => (
          <div key={i} className="relative pl-8 border-l border-line">
            <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-signal shadow-[0_0_8px_2px_rgba(74,222,128,0.4)]" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-display text-2xl text-ink">{e.role as string}</h3>
              <span className="text-muted text-sm">— {e.company as string}</span>
            </div>
            <div className="font-mono text-[11px] text-faint mt-1">{e.period as string}</div>
            <p className="mt-3 text-[14.5px] text-muted leading-relaxed">{e.summary as string}</p>
            {Array.isArray(e.bullets) && e.bullets.length > 0 && (
              <ul className="mt-4 space-y-2">
                {(e.bullets as string[]).map((b, bi) => (
                  <li key={bi} className="flex gap-2.5 text-[14px] text-muted leading-relaxed">
                    <span className="text-wire2 font-mono shrink-0">›</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {certifications && certifications.length > 0 && (
        <div className="mt-16">
          <h3 className="font-mono text-[11px] uppercase tracking-wide text-faint mb-4">certifications</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {certifications.map((c, i) => {
              const CardTag = c.link ? "a" : "div";
              const cardProps = c.link
                ? { href: c.link, target: "_blank", rel: "noreferrer" }
                : {};
              return (
                <CardTag
                  key={i}
                  {...cardProps}
                  className={`rounded-lg border border-line bg-surface px-4 py-3.5 block ${
                    c.link ? "hover:border-signal/40 hover:bg-surface2/60 transition-colors cursor-pointer" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-[13.5px] text-ink font-medium leading-snug">{c.name}</div>
                    {c.link && <i className="fa-solid fa-arrow-up-right-from-square text-faint text-[11px] mt-0.5 shrink-0" aria-hidden />}
                  </div>
                  <div className="mt-1.5 font-mono text-[11px] text-faint">
                    {c.issuer} · {c.period}
                  </div>
                </CardTag>
              );
            })}
          </div>
        </div>
      )}

      {achievements && achievements.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {achievements.map((a, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/5 px-3.5 py-1.5 font-mono text-[12px] text-amber"
            >
              🏆 {a.text}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
