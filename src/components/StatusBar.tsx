import { useEffect, useState } from "react";

const LINKS = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export default function StatusBar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled ? "bg-base/90 backdrop-blur border-line" : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm text-ink">
          <span className="w-2 h-2 rounded-full bg-signal shadow-[0_0_8px_2px_rgba(74,222,128,0.5)]" />
          <span className="text-muted">GET</span>
          <span>/{name.toLowerCase().replace(/\s+/g, "-")}</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 font-mono text-[13px]">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-muted hover:text-signal transition-colors">
              /{l.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            className="rounded border border-signal/40 text-signal px-3 py-1.5 hover:bg-signal/10 transition-colors"
          >
            resume.pdf ↓
          </a>
        </nav>

        <button
          className="md:hidden text-muted hover:text-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-base px-5 py-4 flex flex-col gap-4 font-mono text-sm">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted hover:text-signal">
              /{l.label}
            </a>
          ))}
          <a href="/resume.pdf" className="text-signal">
            resume.pdf ↓
          </a>
        </div>
      )}
    </header>
  );
}
