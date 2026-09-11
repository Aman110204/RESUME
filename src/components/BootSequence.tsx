import { useEffect, useState } from "react";

const REQUEST_LINE = "curl -s https://api.amankumar.dev/v1/profile";
const RESPONSE_LINES = [
  '{',
  '  "status": 200,',
  '  "engineer": "Aman Kumar",',
  '  "role": "Full Stack Developer",',
  '  "stack": ["Java", "Spring", "React", "Node", "PostgreSQL"],',
  '  "availability": "open_to_work"',
  '}',
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [typed, setTyped] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (skip) return;
    if (typed.length < REQUEST_LINE.length) {
      const t = setTimeout(() => setTyped(REQUEST_LINE.slice(0, typed.length + 1)), 14);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowResponse(true), 150);
    return () => clearTimeout(t);
  }, [typed, skip]);

  useEffect(() => {
    if (skip || !showResponse) return;
    if (visibleLines < RESPONSE_LINES.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 40);
      return () => clearTimeout(t);
    }
    const t = setTimeout(onDone, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResponse, visibleLines, skip]);

  useEffect(() => {
    if (skip) onDone();
  }, [skip, onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base px-4">
      <button
        onClick={() => setSkip(true)}
        className="absolute top-5 right-5 text-xs font-mono text-faint hover:text-muted transition-colors"
      >
        skip →
      </button>
      <div className="w-full max-w-xl rounded-lg border border-line bg-surface shadow-2xl shadow-black/40 overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-surface2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-signal/70" />
          <span className="ml-3 text-[11px] font-mono text-faint">zsh — profile.request</span>
        </div>
        <div className="p-5 font-mono text-[13px] leading-relaxed min-h-[220px]">
          <div className="text-muted">
            <span className="text-signal">➜</span> <span className="text-wire2">~</span> {typed}
            {typed.length < REQUEST_LINE.length && <span className="animate-blink">▍</span>}
          </div>
          {showResponse && (
            <div className="mt-3">
              {RESPONSE_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} className="text-ink/90 animate-rise">
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
