import { useEffect, useState } from "react";
import { fetchSiteContent, saveSiteContent, supabase } from "../lib/supabase";
import type { SiteContent } from "../lib/types";
import { seedContent } from "../lib/content";
import ListEditor from "./ListEditor";
import AdminLogin from "./AdminLogin";

const ADMIN_EMAIL = "amankumar110204@gmail.com";

const TABS = [
  "hero",
  "metrics",
  "about",
  "skills",
  "experience",
  "projects",
  "certifications",
  "badges",
  "achievements",
  "contacts",
  "custom sections",
] as const;
type Tab = (typeof TABS)[number];

export default function AdminPanel() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [wrongAccount, setWrongAccount] = useState(false);
  const [content, setContent] = useState<SiteContent>(seedContent);
  const [tab, setTab] = useState<Tab>("hero");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!supabase) {
      setAuthed(false);
      return;
    }
    const checkSession = (session: { user?: { email?: string } } | null) => {
      if (session?.user?.email === ADMIN_EMAIL) {
        setAuthed(true);
        setWrongAccount(false);
      } else if (session) {
        setAuthed(false);
        setWrongAccount(true);
      } else {
        setAuthed(false);
        setWrongAccount(false);
      }
    };
    supabase.auth.getSession().then(({ data }) => checkSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => checkSession(session));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (authed) fetchSiteContent().then(setContent);
  }, [authed]);

  async function handleSave() {
    setStatus("saving");
    try {
      await saveSiteContent(content);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1800);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Save failed");
    }
  }

  if (authed === null) return null;
  if (!authed && wrongAccount) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base px-4">
        <div className="w-full max-w-sm rounded-lg border border-line bg-surface p-7 text-center">
          <div className="font-mono text-[11px] text-rose mb-2">403 Forbidden</div>
          <h1 className="font-display text-3xl text-ink mb-3">Wrong account</h1>
          <p className="text-[13.5px] text-muted mb-6">
            This admin console is scoped to the site owner's account.
          </p>
          <button
            onClick={() => supabase?.auth.signOut()}
            className="rounded-md border border-line px-4 py-2 text-[13px] text-ink hover:border-signal/40"
          >
            Sign out and try again
          </button>
        </div>
      </div>
    );
  }
  if (!authed) return <AdminLogin onLoggedIn={() => {}} />;

  return (
    <div className="min-h-screen bg-base">
      <header className="border-b border-line px-5 sm:px-8 h-16 flex items-center justify-between">
        <div className="font-mono text-[13px] text-ink">
          <span className="text-signal">●</span> admin console
        </div>
        <div className="flex items-center gap-4">
          {status === "saved" && <span className="font-mono text-[12px] text-signal">saved ✓</span>}
          {status === "error" && <span className="font-mono text-[12px] text-rose">{errorMsg}</span>}
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className="rounded-md bg-signal text-base font-semibold px-4 py-2 text-[13px] hover:bg-signal2 transition-colors disabled:opacity-60"
          >
            {status === "saving" ? "Saving…" : "Save changes"}
          </button>
          <a href="/" className="font-mono text-[12px] text-faint hover:text-muted">
            view site ↗
          </a>
          <button onClick={() => supabase?.auth.signOut()} className="font-mono text-[12px] text-faint hover:text-rose">
            sign out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
        <nav className="flex flex-wrap gap-2 mb-8 font-mono text-[12px]">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded border transition-colors ${
                tab === t ? "border-signal/40 bg-signal/10 text-signal" : "border-line text-muted hover:text-ink"
              }`}
            >
              /{t}
            </button>
          ))}
        </nav>

        {tab === "hero" && (
          <div className="space-y-4 max-w-2xl">
            {(
              [
                ["eyebrow", "Eyebrow"],
                ["headline", "Headline"],
                ["subtitle", "Subtitle"],
                ["primaryCtaLabel", "Primary CTA label"],
                ["primaryCtaHref", "Primary CTA link"],
                ["secondaryCtaLabel", "Secondary CTA label"],
                ["secondaryCtaHref", "Secondary CTA link"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block">
                <span className="block font-mono text-[10px] uppercase tracking-wide text-faint mb-1">{label}</span>
                {key === "headline" || key === "subtitle" ? (
                  <textarea
                    rows={key === "subtitle" ? 4 : 2}
                    value={content.hero[key]}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, [key]: e.target.value } })}
                    className="w-full rounded-md border border-line bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-signal"
                  />
                ) : (
                  <input
                    value={content.hero[key]}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, [key]: e.target.value } })}
                    className="w-full rounded-md border border-line bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-signal"
                  />
                )}
              </label>
            ))}
          </div>
        )}

        {tab === "metrics" && (
          <ListEditor
            items={content.metrics}
            onChange={(metrics) => setContent({ ...content, metrics })}
            fields={[
              { key: "value", label: "Value" },
              { key: "label", label: "Label" },
            ]}
            emptyItem={{ value: "", label: "" }}
            titleKey="label"
          />
        )}

        {tab === "about" && (
          <div className="space-y-6 max-w-2xl">
            <label className="block">
              <span className="block font-mono text-[10px] uppercase tracking-wide text-faint mb-1">About text</span>
              <textarea
                rows={6}
                value={content.aboutText}
                onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
                className="w-full rounded-md border border-line bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-signal"
              />
            </label>
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-wide text-faint mb-2">Quick facts</span>
              <ListEditor
                items={content.quickFacts}
                onChange={(quickFacts) => setContent({ ...content, quickFacts })}
                fields={[
                  { key: "icon", label: "Icon class (Font Awesome)" },
                  { key: "text", label: "Text" },
                ]}
                emptyItem={{ icon: "fa-star", text: "" }}
                titleKey="text"
              />
            </div>
          </div>
        )}

        {tab === "skills" && (
          <ListEditor
            items={content.skills}
            onChange={(skills) => setContent({ ...content, skills })}
            fields={[
              { key: "icon", label: "Icon class (Font Awesome)" },
              { key: "label", label: "Label" },
            ]}
            emptyItem={{ icon: "fa-code", label: "" }}
            titleKey="label"
          />
        )}

        {tab === "experience" && (
          <div className="space-y-6">
            <ListEditor
              items={content.experience}
              onChange={(experience) => setContent({ ...content, experience })}
              fields={[
                { key: "role", label: "Role" },
                { key: "company", label: "Company" },
                { key: "period", label: "Period" },
                { key: "summary", label: "Summary", type: "textarea" },
              ]}
              emptyItem={{ role: "", company: "", period: "", summary: "", bullets: [] }}
              titleKey="role"
            />
            <div className="max-w-2xl">
              <span className="block font-mono text-[10px] uppercase tracking-wide text-faint mb-2">
                Bullet points per role (one per line, matched to role order above)
              </span>
              {content.experience.map((e, i) => (
                <label key={i} className="block mb-4">
                  <span className="block font-mono text-[11px] text-muted mb-1">
                    [{i}] {(e.role as string) || "untitled"}
                  </span>
                  <textarea
                    rows={4}
                    value={(Array.isArray(e.bullets) ? (e.bullets as string[]) : []).join("\n")}
                    onChange={(ev) => {
                      const experience = [...content.experience];
                      experience[i] = {
                        ...experience[i],
                        bullets: ev.target.value.split("\n").filter((l) => l.trim() !== ""),
                      };
                      setContent({ ...content, experience });
                    }}
                    className="w-full rounded-md border border-line bg-surface2 px-3 py-2 text-[13px] text-ink outline-none focus:border-signal"
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {tab === "projects" && (
          <ListEditor
            items={content.projects}
            onChange={(projects) => setContent({ ...content, projects })}
            fields={[
              { key: "title", label: "Title" },
              { key: "method", label: "Method (GET/POST/PUT)" },
              { key: "path", label: "Path" },
              { key: "status", label: "Status label" },
              { key: "summary", label: "Summary", type: "textarea" },
              { key: "details", label: "Details", type: "textarea" },
              { key: "role", label: "Your role" },
              { key: "results", label: "Result" },
              { key: "github", label: "GitHub link" },
              { key: "tags", label: "Tags", type: "tags" },
            ]}
            emptyItem={{
              title: "",
              image: "",
              summary: "",
              details: "",
              tags: [],
              role: "",
              results: "",
              github: "",
              method: "GET",
              path: "",
              status: "200 OK",
            }}
            titleKey="title"
          />
        )}

        {tab === "certifications" && (
          <ListEditor
            items={content.certifications ?? []}
            onChange={(certifications) => setContent({ ...content, certifications })}
            fields={[
              { key: "name", label: "Name" },
              { key: "issuer", label: "Issuer" },
              { key: "period", label: "Period" },
              { key: "link", label: "Certificate link (Drive URL, or /certs/yourfile.pdf)" },
            ]}
            emptyItem={{ name: "", issuer: "", period: "", link: "" }}
            titleKey="name"
          />
        )}

        {tab === "badges" && (
          <div>
            <p className="text-[13px] text-muted mb-4 max-w-xl">
              For badges from Credly or similar — paste the badge's public share link (from Credly: open the
              badge → "Share" → copy the public URL).
            </p>
            <ListEditor
              items={content.badges ?? []}
              onChange={(badges) => setContent({ ...content, badges })}
              fields={[
                { key: "name", label: "Badge name" },
                { key: "issuer", label: "Issuer" },
                { key: "link", label: "Badge link (Credly URL, etc.)" },
              ]}
              emptyItem={{ name: "", issuer: "", link: "" }}
              titleKey="name"
            />
          </div>
        )}

        {tab === "achievements" && (
          <ListEditor
            items={content.achievements ?? []}
            onChange={(achievements) => setContent({ ...content, achievements })}
            fields={[{ key: "text", label: "Text" }]}
            emptyItem={{ text: "" }}
            titleKey="text"
          />
        )}

        {tab === "contacts" && (
          <ListEditor
            items={content.contacts}
            onChange={(contacts) => setContent({ ...content, contacts })}
            fields={[
              { key: "label", label: "Label" },
              { key: "value", label: "Display value" },
              { key: "href", label: "Link (mailto:/tel:/https://)" },
              { key: "icon", label: "Icon class (Font Awesome)" },
            ]}
            emptyItem={{ icon: "fa-solid fa-link", label: "", value: "", href: "", targetBlank: true }}
            titleKey="label"
          />
        )}

        {tab === "custom sections" && (
          <ListEditor
            items={content.customSections}
            onChange={(customSections) => setContent({ ...content, customSections })}
            fields={[
              { key: "title", label: "Title" },
              { key: "body", label: "Body", type: "textarea" },
            ]}
            emptyItem={{ title: "", body: "" }}
            titleKey="title"
          />
        )}
      </div>
    </div>
  );
}
