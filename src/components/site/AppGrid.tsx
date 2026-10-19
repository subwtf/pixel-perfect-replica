import { Fragment } from "react";
import type { AppItem } from "@/lib/apps";
import { AppCard } from "./AppCard";
import { AdContainer } from "./AdContainer";
import { ENABLE_ADS } from "@/config";

export function AppGrid({ items, adEvery = 7 }: { items: AppItem[]; adEvery?: number }) {
  if (!items.length) return <p className="py-12 text-center text-muted-foreground">Приложения не найдены.</p>;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((a, i) => (
        <Fragment key={a.id}>
          <AppCard app={a} />
          {ENABLE_ADS && adEvery > 0 && (i + 1) % adEvery === 0 && <AdContainer slot="in-grid" variant="card" />}
        </Fragment>
      ))}
    </div>
  );
}
