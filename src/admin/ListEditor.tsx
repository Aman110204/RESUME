interface FieldConfig<T> {
  key: keyof T;
  label: string;
  type?: "text" | "textarea" | "tags";
}

interface Props<T> {
  items: T[];
  onChange: (items: T[]) => void;
  fields: FieldConfig<T>[];
  emptyItem: T;
  titleKey: keyof T;
}

export default function ListEditor<T extends Record<string, unknown>>({
  items,
  onChange,
  fields,
  emptyItem,
  titleKey,
}: Props<T>) {
  const update = (i: number, key: keyof T, value: unknown) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  };

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, { ...emptyItem }]);
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-line bg-surface p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] text-faint">
              [{i}] {String(item[titleKey] ?? "untitled")}
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <button type="button" onClick={() => move(i, -1)} className="text-faint hover:text-ink px-1.5">
                ↑
              </button>
              <button type="button" onClick={() => move(i, 1)} className="text-faint hover:text-ink px-1.5">
                ↓
              </button>
              <button type="button" onClick={() => remove(i)} className="text-rose hover:text-rose/80 px-1.5">
                remove
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {fields.map((f) => (
              <label key={String(f.key)} className={f.type === "textarea" ? "sm:col-span-2 block" : "block"}>
                <span className="block font-mono text-[10px] uppercase tracking-wide text-faint mb-1">
                  {f.label}
                </span>
                {f.type === "textarea" ? (
                  <textarea
                    value={String(item[f.key] ?? "")}
                    onChange={(e) => update(i, f.key, e.target.value)}
                    rows={3}
                    className="w-full rounded-md border border-line bg-surface2 px-2.5 py-2 text-[13px] text-ink outline-none focus:border-signal resize-y"
                  />
                ) : f.type === "tags" ? (
                  <input
                    value={Array.isArray(item[f.key]) ? (item[f.key] as string[]).join(", ") : ""}
                    onChange={(e) =>
                      update(
                        i,
                        f.key,
                        e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    placeholder="comma, separated, tags"
                    className="w-full rounded-md border border-line bg-surface2 px-2.5 py-2 text-[13px] text-ink outline-none focus:border-signal"
                  />
                ) : (
                  <input
                    value={String(item[f.key] ?? "")}
                    onChange={(e) => update(i, f.key, e.target.value)}
                    className="w-full rounded-md border border-line bg-surface2 px-2.5 py-2 text-[13px] text-ink outline-none focus:border-signal"
                  />
                )}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="w-full rounded-md border border-dashed border-line py-2.5 font-mono text-[12px] text-faint hover:text-signal hover:border-signal/40 transition-colors"
      >
        + add item
      </button>
    </div>
  );
}
