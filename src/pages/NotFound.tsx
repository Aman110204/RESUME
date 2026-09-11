export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base px-4">
      <div className="w-full max-w-md rounded-lg border border-line bg-surface p-8 text-center">
        <div className="font-mono text-[11px] text-rose mb-2">404 Not Found</div>
        <h1 className="font-display text-4xl text-ink mb-3">Nothing here.</h1>
        <p className="text-[14px] text-muted mb-6">
          That endpoint doesn't exist. Let's get you back to something that resolves.
        </p>
        <a
          href="/"
          className="inline-block rounded-md bg-signal text-base font-semibold px-5 py-2.5 text-[14px] hover:bg-signal2 transition-colors"
        >
          ← Back to site
        </a>
      </div>
    </div>
  );
}
