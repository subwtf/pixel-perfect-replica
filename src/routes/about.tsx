import { createFileRoute } from "@tanstack/react-router";
import { DISCLAIMER } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О проекте и FOSS — GitAPK Релизы" },
      { name: "description", content: "GitAPK — легальный каталог свободного ПО: только официальные релизы открытых проектов с GitHub." },
      { property: "og:title", content: "О проекте GitAPK" },
      { property: "og:description", content: "Что такое FOSS и откуда берутся релизы." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <article className="prose-app mx-auto max-w-2xl rounded-2xl border bg-card p-6">
      <h1 className="text-2xl font-extrabold">О проекте & FOSS</h1>
      <p>GitAPK Релизы — официальный каталог свободного программного обеспечения (Free and Open-Source Software) для Android.</p>
      <h3>Откуда приложения</h3>
      <p>Вся информация, описания и APK-файлы берутся напрямую из публичных репозиториев GitHub (раздел Releases). Мы не храним и не изменяем файлы.</p>
      <h3>Что мы не публикуем</h3>
      <ul><li>Взломанные и модифицированные приложения</li><li>«Premium Unlocked» и платное ПО</li><li>Нелицензионные материалы</li></ul>
      <p><strong>{DISCLAIMER}</strong></p>
    </article>
  ),
});
