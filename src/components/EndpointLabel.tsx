export default function EndpointLabel({
  method,
  path,
  title,
}: {
  method: "GET" | "POST" | "PUT";
  path: string;
  title: string;
}) {
  const methodColor =
    method === "GET" ? "text-wire2 border-wire/30 bg-wire/5" : "text-signal border-signal/30 bg-signal/5";

  return (
    <div className="flex items-center gap-3 mb-10">
      <span className={`font-mono text-[11px] font-semibold rounded border px-2 py-1 ${methodColor}`}>
        {method}
      </span>
      <span className="font-mono text-[13px] text-faint">{path}</span>
      <div className="flex-1 h-px bg-line" />
      <h2 className="font-display text-3xl sm:text-4xl text-ink shrink-0">{title}</h2>
    </div>
  );
}
