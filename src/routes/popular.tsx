import { createFileRoute } from "@tanstack/react-router";
import { topApps } from "@/lib/apps";
import { AppGrid } from "@/components/site/AppGrid";

export const Route = createFileRoute("/popular")({
  head: () => ({
    meta: [
      { title: "Популярные приложения — GitAPK Релизы" },
      { name: "description", content: "Самые популярные свободные Android-приложения с официальными релизами на GitHub." },
      { property: "og:title", content: "Популярные FOSS-приложения" },
      { property: "og:description", content: "Лучшие открытые Android-приложения." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Популярные</h1>
      <AppGrid items={topApps()} />
    </div>
  ),
});
