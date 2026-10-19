import { categories } from "@/lib/apps";

export function CategoryChips({ value, onChange }: { value?: string | undefined; onChange: (v?: string) => void }) {
  const chip = (active: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`;
  return (
    <div className="no-scrollbar -mx-3 flex gap-2 overflow-x-auto px-3 pb-1">
      <button className={chip(!value)} onClick={() => onChange(undefined)}>Все</button>
      {categories.map((c) => (
        <button key={c.id} className={chip(value === c.id)} onClick={() => onChange(c.id)}>{c.short}</button>
      ))}
    </div>
  );
}
