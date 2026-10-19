import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, Home, LayoutGrid, Gamepad2, Sparkles, Compass, Flame, Info, Github } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { SearchOverlay } from "./SearchOverlay";
import { AdContainer, StickyAd } from "./AdContainer";
import { categories } from "@/lib/apps";

export const DISCLAIMER =
  "Все приложения распространяются по открытым лицензиям (GPL, MIT, Apache и др.). Все ссылки ведут на официальные релизы в репозиториях GitHub.";

const nav = [
  { to: "/", label: "Главная", icon: Home },
  { to: "/apps", label: "Все приложения", icon: LayoutGrid },
  { to: "/updates", label: "Новые обновления", icon: Sparkles },
  { to: "/popular", label: "Популярные", icon: Flame },
  { to: "/about", label: "О проекте & FOSS", icon: Info },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3">
          <button onClick={() => setMenu(true)} aria-label="Меню" className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted">
            <Menu className="h-5 w-5" />
          </button>
          <Logo />
          <div className="ml-auto flex items-center gap-1">
            <button onClick={() => setSearch(true)} aria-label="Поиск" className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted">
              <Search className="h-5 w-5" />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="left" className="w-80 overflow-y-auto p-0">
          <SheetTitle className="sr-only">Меню</SheetTitle>
          <div className="border-b bg-primary-soft p-5">
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">Каталог свободных Android-приложений с официальными релизами GitHub.</p>
          </div>
          <nav className="p-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMenu(false)} activeOptions={{ exact: true, includeSearch: false }}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted data-[status=active]:bg-primary-soft data-[status=active]:text-primary">
                <n.icon className="h-5 w-5" /> {n.label}
              </Link>
            ))}
            <p className="px-3 pb-1 pt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Категории</p>
            {categories.map((c) => (
              <Link key={c.id} to="/apps" search={{ cat: c.id }} onClick={() => setMenu(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-muted">
                <c.icon className="h-5 w-5 text-primary" /> {c.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <SearchOverlay open={search} onOpenChange={setSearch} />

      <div className="px-3 pt-3"><AdContainer slot="header" /></div>

      <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-6">{children}</main>

      <footer className="mt-10 border-t bg-card">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm text-muted-foreground md:grid-cols-2">
          <div>
            <Logo />
            <p className="mt-3 max-w-md">{DISCLAIMER}</p>
          </div>
          <div className="flex flex-wrap items-start gap-4 md:justify-end">
            {nav.slice(1).map((n) => <Link key={n.to} to={n.to} className="hover:text-primary">{n.label}</Link>)}
            <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-primary"><Github className="h-4 w-4" />GitHub</a>
          </div>
        </div>
      </footer>

      <StickyAd />
      <BottomNav />
    </div>
  );
}

function BottomNav() {
  const { pathname, cat } = useRouterState({
    select: (s) => ({ pathname: s.location.pathname, cat: (s.location.search as { cat?: string }).cat }),
  });
  const items = [
    { key: "home", label: "Главная", icon: Home, active: pathname === "/", link: <Link to="/" /> },
    { key: "apps", label: "Приложения", icon: LayoutGrid, active: pathname === "/apps" && cat !== "games" },
    { key: "games", label: "Игры", icon: Gamepad2, active: pathname === "/apps" && cat === "games" },
    { key: "news", label: "Обновления", icon: Sparkles, active: pathname === "/updates" },
    { key: "browse", label: "Категории", icon: Compass, active: pathname === "/categories" },
  ];
  const cls = (a: boolean) => `flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium ${a ? "text-primary" : "text-muted-foreground"}`;
  const pill = (a: boolean) => `grid h-7 w-14 place-items-center rounded-full transition-colors ${a ? "bg-primary-soft" : ""}`;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t bg-background/95 backdrop-blur-xl md:hidden">
      {items.map((it) => {
        const inner = (<><span className={pill(it.active)}><it.icon className="h-5 w-5" /></span>{it.label}</>);
        if (it.key === "home") return <Link key={it.key} to="/" className={cls(it.active)}>{inner}</Link>;
        if (it.key === "apps") return <Link key={it.key} to="/apps" className={cls(it.active)}>{inner}</Link>;
        if (it.key === "games") return <Link key={it.key} to="/apps" search={{ cat: "games" }} className={cls(it.active)}>{inner}</Link>;
        if (it.key === "news") return <Link key={it.key} to="/updates" className={cls(it.active)}>{inner}</Link>;
        return <Link key={it.key} to="/categories" className={cls(it.active)}>{inner}</Link>;
      })}
    </nav>
  );
}
