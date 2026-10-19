import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { apps, byCategory, topApps } from "@/lib/apps";
import { AppGrid } from "@/components/site/AppGrid";
import { AppIcon } from "@/components/site/AppCard";
import { CategoryChips } from "@/components/site/CategoryChips";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GitAPK Релизы — каталог FOSS Android-приложений с GitHub" },
      { name: "description", content: "Скачивайте свободные Android-приложения (FOSS) напрямую из официальных релизов GitHub. Без модов, вирусов и взломов." },
      { property: "og:title", content: "GitAPK Релизы — FOSS-каталог Android" },
      { property: "og:description", content: "Официальные APK-релизы открытых приложений с GitHub." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const [cat, setCat] = useState<string | undefined>();
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-extrabold md:text-3xl">Свободные приложения <span className="text-primary">прямо с GitHub</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">{apps.length} открытых проектов · только официальные релизы</p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">Top Apps</h2>
        <div className="no-scrollbar -mx-3 flex gap-4 overflow-x-auto px-3 pb-2">
          {topApps().map((a) => (
            <Link key={a.id} to="/app/$slug" params={{ slug: a.slug }} className="group relative w-28 shrink-0">
              <AppIcon app={a} className="h-28 w-28 shadow-card transition-transform group-hover:scale-105" />
              <span className="absolute right-1 top-1 rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">Top</span>
              <p className="mt-2 truncate text-sm font-semibold">{a.name}</p>
              <p className="truncate text-xs text-muted-foreground">{a.categoryName}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <CategoryChips value={cat} onChange={setCat} />
        <AppGrid items={byCategory(cat)} />
      </section>
    </div>
  );
}
