import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminLogin({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase isn't configured — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    onLoggedIn();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-lg border border-line bg-surface p-7">
        <div className="font-mono text-[11px] text-faint mb-1">POST /admin/login</div>
        <h1 className="font-display text-3xl text-ink mb-6">Admin access</h1>

        <label className="block mb-4">
          <span className="block font-mono text-[11px] text-faint mb-1.5">email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-line bg-surface2 px-3 py-2.5 text-sm text-ink outline-none focus:border-signal"
          />
        </label>

        <label className="block mb-6">
          <span className="block font-mono text-[11px] text-faint mb-1.5">password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-line bg-surface2 px-3 py-2.5 text-sm text-ink outline-none focus:border-signal"
          />
        </label>

        {error && <p className="text-rose text-[13px] mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-signal text-base font-semibold py-2.5 text-sm hover:bg-signal2 transition-colors disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <a href="/" className="block text-center mt-5 font-mono text-[12px] text-faint hover:text-muted">
          ← back to site
        </a>
      </form>
    </div>
  );
}
