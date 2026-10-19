import { Link } from "@tanstack/react-router";
import type { AppItem } from "@/lib/apps";

export function AppIcon({ app, className = "h-16 w-16" }: { app: AppItem; className?: string }) {
  return <img src={app.icon} alt={app.name} loading="lazy" className={`${className} rounded-[22%] bg-muted object-cover`} />;
}

export function AppCard({ app }: { app: AppItem }) {
  return (
    <Link
      to="/app/$slug"
      params={{ slug: app.slug }}
      className="group flex flex-col gap-3 rounded-2xl border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <AppIcon app={app} />
      <h3 className="line-clamp-2 font-bold leading-tight group-hover:text-primary">{app.name}</h3>
      <p className="text-xs text-muted-foreground">v{app.version.replace(/^v/, "")} · {app.size}</p>
      <div className="mt-auto flex flex-wrap gap-1.5">
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{app.categoryName}</span>
        <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary">FOSS</span>
      </div>
    </Link>
  );
}
