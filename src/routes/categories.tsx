import { createFileRoute, Link } from "@tanstack/react-router";
import { byCategory, categories } from "@/lib/apps";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Категории — GitAPK Релизы" },
      { name: "description", content: "VPN, плееры, мессенджеры, утилиты, игры и другие категории свободных Android-приложений." },
      { property: "og:title", content: "Категории FOSS-приложений" },
      { property: "og:description", content: "Обзор категорий каталога GitAPK." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Категории</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.id} to="/apps" search={{ cat: c.id }} className="flex flex-col gap-3 rounded-2xl border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary"><c.icon className="h-6 w-6" /></span>
            <span className="font-semibold leading-tight">{c.name}</span>
            <span className="text-xs text-muted-foreground">{byCategory(c.id).length} прил.</span>
          </Link>
        ))}
      </div>
    </div>
  ),
});
