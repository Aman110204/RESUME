import type { SiteContent } from "../lib/types";
import ProfilePhoto from "./ProfilePhoto";

export default function Hero({ hero, metrics }: { hero: SiteContent["hero"]; metrics: SiteContent["metrics"] }) {
  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="absolute inset-0 bg-dot-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 flex flex-col lg:flex-row-reverse lg:items-start lg:justify-between gap-8 lg:gap-10">
        <div className="shrink-0 mx-auto lg:mx-0 pt-1 animate-rise" style={{ animationDelay: "60ms" }}>
          <ProfilePhoto />
        </div>

        <div className="min-w-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/5 px-3 py-1 text-[12px] font-mono text-signal mb-7 animate-rise">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          {hero.eyebrow}
        </div>

        <h1
          className="font-display text-[3rem] leading-[1.05] sm:text-[4.5rem] sm:leading-[1.02] text-ink max-w-3xl animate-rise"
          style={{ animationDelay: "80ms" }}
        >
          {hero.headline}
        </h1>

        <p
          className="mt-6 max-w-xl text-[15.5px] sm:text-base leading-relaxed text-muted animate-rise"
          style={{ animationDelay: "160ms" }}
        >
          {hero.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4 animate-rise" style={{ animationDelay: "240ms" }}>
          <a
            href={hero.primaryCtaHref}
            className="rounded-md bg-signal text-base font-semibold px-5 py-3 text-[14px] hover:bg-signal2 transition-colors shadow-lg shadow-signal/10"
          >
            {hero.primaryCtaLabel}
          </a>
          <a
            href={hero.secondaryCtaHref}
            className="rounded-md border border-line px-5 py-3 text-[14px] font-mono text-ink hover:border-wire hover:text-wire2 transition-colors"
          >
            {hero.secondaryCtaLabel}
          </a>
        </div>

        <dl className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
          {metrics.map((m, i) => (
            <div key={i} className="animate-rise" style={{ animationDelay: `${300 + i * 60}ms` }}>
              <dt className="font-display text-4xl text-ink">{m.value}</dt>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-wide text-faint">{m.label}</dd>
            </div>
          ))}
        </dl>
        </div>
      </div>
    </section>
  );
}
