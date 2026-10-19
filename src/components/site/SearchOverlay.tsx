import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { searchApps } from "@/lib/apps";
import { AppIcon } from "./AppCard";

export function SearchOverlay({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const res = searchApps(q);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[12%] translate-y-0 gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-xl">
        <DialogTitle className="sr-only">Поиск приложений</DialogTitle>
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Название, категория, репозиторий…"
            className="h-14 flex-1 bg-transparent outline-none"
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {q && !res.length && <p className="p-6 text-center text-sm text-muted-foreground">Ничего не найдено</p>}
          {!q && <p className="p-6 text-center text-sm text-muted-foreground">Начните вводить запрос</p>}
          {res.map((a) => (
            <Link
              key={a.id}
              to="/app/$slug"
              params={{ slug: a.slug }}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 rounded-xl p-2 hover:bg-muted"
            >
              <AppIcon app={a} className="h-11 w-11" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{a.name}</p>
                <p className="truncate text-xs text-muted-foreground">v{a.version.replace(/^v/, "")} · {a.categoryName} · {a.developer}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
