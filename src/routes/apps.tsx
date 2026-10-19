import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { byCategory, categories } from "@/lib/apps";
import { AppGrid } from "@/components/site/AppGrid";
import { CategoryChips } from "@/components/site/CategoryChips";

export const Route = createFileRoute("/apps")({
  validateSearch: (s: Record<string, unknown>): { cat?: string | undefined } => ({
    cat: typeof s["cat"] === "string" ? (s["cat"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Все приложения — GitAPK Релизы" },
      { name: "description", content: "Полный каталог свободных Android-приложений с официальными APK-релизами GitHub по категориям." },
      { property: "og:title", content: "Все FOSS-приложения — GitAPK" },
      { property: "og:description", content: "Каталог открытых Android-приложений по категориям." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AppsPage,
});

function AppsPage() {
  const { cat } = Route.useSearch();
  const navigate = useNavigate({ from: "/apps" });
  const title = categories.find((c) => c.id === cat)?.name ?? "Все приложения";
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">{title}</h1>
      <CategoryChips value={cat} onChange={(v) => navigate({ search: { cat: v } })} />
      <AppGrid items={byCategory(cat)} />
    </div>
  );
}
