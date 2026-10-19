import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const on = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.classList.toggle("dark", e.matches);
        setDark(e.matches);
      }
    };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button onClick={toggle} aria-label="Сменить тему" className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted">
      <span className={`transition-transform duration-500 ${dark ? "rotate-[360deg]" : "rotate-0"}`}>
        {dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </span>
    </button>
  );
}
