export default function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-line">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
        <div className="font-mono text-[12px] text-faint">
          <span className="text-signal">➜</span> ~ echo "built by {name}, {new Date().getFullYear()}"
        </div>
      </div>
    </footer>
  );
}
