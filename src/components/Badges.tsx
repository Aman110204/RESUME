import type { Badge } from "../lib/types";
import EndpointLabel from "./EndpointLabel";

export default function Badges({ badges }: { badges?: Badge[] }) {
  if (!badges || badges.length === 0) return null;

  return (
    <section id="badges" className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <EndpointLabel method="GET" path="/badges" title="Badges" />
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {badges.map((b, i) => (
          <a
            key={i}
            href={b.link}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col items-center text-center rounded-lg border border-line bg-surface px-4 py-6 hover:border-amber/40 hover:bg-surface2/60 transition-colors"
          >
            <span className="w-12 h-12 rounded-full bg-amber/10 border border-amber/30 flex items-center justify-center text-amber mb-3 group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-award text-lg" aria-hidden />
            </span>
            <div className="text-[13px] text-ink font-medium leading-snug">{b.name}</div>
            <div className="mt-1 font-mono text-[10px] text-faint">{b.issuer}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
