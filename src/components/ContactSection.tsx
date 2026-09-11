import type { Contact } from "../lib/types";
import EndpointLabel from "./EndpointLabel";

export default function ContactSection({ contacts }: { contacts: Contact[] }) {
  return (
    <section id="contact" className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <EndpointLabel method="POST" path="/contact" title="Let's talk" />
      <p className="text-[15px] text-muted max-w-lg mb-10">
        Open to Full Stack Developer, Java Developer, and related fresher roles in Bangalore or remote. Reach out —
        I usually reply within a day.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {contacts.map((c, i) => (
          <a
            key={i}
            href={c.href}
            target={c.targetBlank ? "_blank" : undefined}
            rel={c.targetBlank ? "noreferrer" : undefined}
            className="group flex items-center gap-4 rounded-lg border border-line bg-surface px-5 py-4 hover:border-signal/40 hover:bg-surface2/60 transition-colors"
          >
            <span className="w-9 h-9 rounded-md bg-surface2 border border-line flex items-center justify-center text-wire2 group-hover:text-signal transition-colors">
              <i className={c.icon} aria-hidden />
            </span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wide text-faint">{c.label}</div>
              <div className="text-[13.5px] text-ink">{c.value}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
