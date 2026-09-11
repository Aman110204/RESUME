import type { SiteContent } from "../lib/types";
import EndpointLabel from "./EndpointLabel";

export default function Skills({ skills }: { skills: SiteContent["skills"] }) {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <EndpointLabel method="GET" path="/skills" title="Capabilities" />
      <div className="rounded-lg border border-line bg-surface overflow-hidden">
        <div className="px-5 py-3 border-b border-line font-mono text-[11px] text-faint flex items-center gap-2">
          <span className="text-signal">200</span> response-headers
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 divide-line">
          {skills.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-4 border-line sm:border-r sm:border-b lg:[&:nth-child(3n)]:border-r-0 sm:[&:nth-child(2n)]:lg:border-r hover:bg-surface2/60 transition-colors"
            >
              <i className={`${s.icon} text-wire2 w-4 text-center`} aria-hidden />
              <span className="font-mono text-[13px] text-ink">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
