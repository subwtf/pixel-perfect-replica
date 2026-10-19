import { createFileRoute, Link } from "@tanstack/react-router";
import { latest } from "@/lib/apps";
import { AppIcon } from "@/components/site/AppCard";

export const Route = createFileRoute("/updates")({
  head: () => ({
    meta: [
      { title: "Новые обновления — GitAPK Релизы" },
      { name: "description", content: "Свежие релизы свободных Android-приложений на GitHub: версии, даты и изменения." },
      { property: "og:title", content: "Новые обновления FOSS-приложений" },
      { property: "og:description", content: "Последние APK-релизы с GitHub." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Updates,
});

function Updates() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Новые обновления</h1>
      <div className="divide-y rounded-2xl border bg-card">
        {latest().map((a) => (
          <Link key={a.id} to="/app/$slug" params={{ slug: a.slug }} className="flex items-center gap-4 p-4 hover:bg-muted">
            <AppIcon app={a} className="h-12 w-12" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{a.name} <span className="text-primary">v{a.version.replace(/^v/, "")}</span></p>
              <p className="truncate text-sm text-muted-foreground">{a.changelog}</p>
            </div>
            <time className="shrink-0 text-xs text-muted-foreground">{new Date(a.updatedAt).toLocaleDateString("ru-RU")}</time>
          </Link>
        ))}
      </div>
    </div>
  );
}
