import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import Markdown from "react-markdown";
import { Download, Github, Scale, User } from "lucide-react";
import { apps, getApp } from "@/lib/apps";
import { AppCard, AppIcon } from "@/components/site/AppCard";
import { AdContainer } from "@/components/site/AdContainer";
import { DISCLAIMER } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/$slug")({
  loader: ({ params }) => {
    const app = getApp(params.slug);
    if (!app) throw notFound();
    return { app };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.app;
    if (!a) return { meta: [{ title: "Приложение не найдено — GitAPK" }, { name: "robots", content: "noindex" }] };
    const v = a.version.replace(/^v/, "");
    const title = `Скачать ${a.name} ${v} APK с GitHub — GitAPK Релизы`;
    const desc = `${a.name} (${v}): официальный релиз GitHub. ${a.shortDescription}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            name: a.name,
            operatingSystem: "Android",
            applicationCategory: a.categoryName,
            downloadUrl: a.downloadUrl,
            softwareVersion: v,
            fileSize: a.size,
            author: { "@type": "Person", name: a.developer, url: `https://github.com/${a.developer}` },
            offers: { "@type": "Offer", price: "0", priceCurrency: "RUB" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-bold">Приложение не найдено</h1>
      <Link to="/apps" className="mt-4 inline-block text-primary">Все приложения</Link>
    </div>
  ),
  component: AppPage,
});

function AppPage() {
  const { app: a } = Route.useLoaderData();
  const v = a.version.replace(/^v/, "");
  const similar = apps.filter((x) => x.category === a.category && x.id !== a.id);
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="flex gap-4 md:gap-6">
        <AppIcon app={a} className="h-20 w-20 shrink-0 shadow-card md:h-24 md:w-24" />
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold md:text-3xl">{a.name}</h1>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <a href={`https://github.com/${a.developer}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline"><User className="h-4 w-4" />{a.developer}</a>
            <span className="inline-flex items-center gap-1"><Scale className="h-4 w-4" />{a.license}</span>
            <span>{a.categoryName}</span>
            <span className="rounded-full bg-primary-soft px-2 text-xs font-bold leading-5 text-primary">FOSS</span>
          </div>
        </div>
      </header>

      <section className="space-y-3 rounded-2xl border bg-card p-4 md:p-6">
        <AdContainer slot="pre-download" />
        <Button asChild className="h-auto min-h-14 w-full whitespace-normal rounded-2xl bg-gradient-primary py-4 text-center text-base font-bold shadow-glow">
          <a href={a.downloadUrl} target="_blank" rel="nofollow noreferrer">
            <Download className="h-5 w-5 shrink-0" />
            {a.downloadKind === "release" ? `Открыть релиз GitHub (v${v})` : `Скачать APK (v${v} • ${a.size})${a.downloadArchitecture && a.downloadArchitecture !== "universal" ? ` · ${a.downloadArchitecture}` : ""}`}
          </a>
        </Button>
        {a.architectures.length > 0 && (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {a.architectures.map((ar) => (
              <Button asChild key={ar.name} variant="outline" className="h-auto rounded-xl py-2.5 text-center">
                <a href={ar.url} target="_blank" rel="nofollow noreferrer">{ar.name}</a>
              </Button>
            ))}
          </div>
        )}
        <a href={a.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium hover:bg-muted">
          <Github className="h-4 w-4" /> Перейти в GitHub репозиторий
        </a>
        <p className="text-center text-xs text-muted-foreground">{DISCLAIMER}</p>
      </section>

      <section className="rounded-2xl border bg-card p-4 md:p-6">
        <h2 className="text-lg font-bold">Описание</h2>
        <div className="prose-app"><Markdown>{a.fullDescriptionMarkdown}</Markdown></div>
        <div className="mt-4"><AdContainer slot="post-description" /></div>
      </section>

      <section className="rounded-2xl border bg-card p-4 md:p-6">
        <h2 className="mb-3 text-lg font-bold">История версий и изменения</h2>
        <ol className="space-y-4 border-l-2 border-primary pl-4">
          {(a.releases ?? [{ version: a.version, date: a.updatedAt, notes: [a.changelog], url: a.githubUrl + "/releases" }]).map((r) => (
            <li key={r.version}>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-bold">v{r.version.replace(/^v/, "")}</span>
                <time className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString("ru-RU")}</time>
                <a href={r.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">Все релизы →</a>
              </div>
              <ul className="prose-app"><>{r.notes.map((n) => <li key={n}>{n}</li>)}</></ul>
            </li>
          ))}
        </ol>
      </section>

      {similar.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-bold">Похожие приложения</h2>
          <div className="no-scrollbar -mx-3 flex gap-3 overflow-x-auto px-3 pb-2">
            {similar.map((s) => <div key={s.id} className="w-40 shrink-0"><AppCard app={s} /></div>)}
          </div>
        </section>
      )}
    </div>
  );
}
