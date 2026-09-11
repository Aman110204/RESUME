import { useState } from "react";
import type { Project } from "../lib/types";
import EndpointLabel from "./EndpointLabel";

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const method = (project.method ?? "GET") as "GET" | "POST" | "PUT";
  const methodColor =
    method === "GET"
      ? "text-wire2 border-wire/30 bg-wire/5"
      : method === "POST"
      ? "text-signal border-signal/30 bg-signal/5"
      : "text-amber border-amber/30 bg-amber/5";

  return (
    <div className="rounded-lg border border-line bg-surface overflow-hidden transition-colors hover:border-faint/60">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className={`font-mono text-[11px] font-semibold rounded border px-2 py-1 shrink-0 ${methodColor}`}>
          {method}
        </span>
        <span className="font-mono text-[13px] text-faint truncate hidden sm:inline">{project.path as string}</span>
        <span className="font-display text-xl text-ink flex-1 min-w-0 truncate">{project.title}</span>
        <span className="font-mono text-[11px] text-signal shrink-0 hidden sm:inline">{project.status as string}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-faint transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-line animate-rise">
          {project.image ? (
            <img
              src={`/${project.image}`}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="mt-4 w-full max-h-72 object-cover rounded-md border border-line"
            />
          ) : null}
          <p className="mt-4 text-[14px] text-muted leading-relaxed">{project.details}</p>

          <div className="mt-4 grid sm:grid-cols-2 gap-4 font-mono text-[12px]">
            <div>
              <div className="text-faint uppercase tracking-wide text-[10px] mb-1">role</div>
              <div className="text-ink">{project.role}</div>
            </div>
            <div>
              <div className="text-faint uppercase tracking-wide text-[10px] mb-1">result</div>
              <div className="text-signal">{project.results}</div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="rounded border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                {t}
              </span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-[13px] font-mono text-wire2 hover:text-ink transition-colors"
          >
            <i className="fa-brands fa-github" aria-hidden />
            view source ↗
          </a>
        </div>
      )}
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <EndpointLabel method="GET" path="/projects" title="Projects" />
      <div className="space-y-3">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  );
}
