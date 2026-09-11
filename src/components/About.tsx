import type { SiteContent } from "../lib/types";
import EndpointLabel from "./EndpointLabel";

export default function About({ text, facts }: { text: string; facts: SiteContent["quickFacts"] }) {
  return (
    <section id="about" className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <EndpointLabel method="GET" path="/about" title="About" />
      <div className="grid sm:grid-cols-[1.4fr_1fr] gap-12">
        <p className="text-[15.5px] leading-[1.85] text-muted">{text}</p>
        <ul className="space-y-4">
          {facts.map((f, i) => (
            <li key={i} className="flex items-start gap-3 font-mono text-[13px] text-ink">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
              {f.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
