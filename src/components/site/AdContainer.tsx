import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { ENABLE_ADS } from "@/config";

type Props = {
  slot: string;
  variant?: "banner" | "card" | "box";
  /** HTML/JS-код рекламной сети (РСЯ, HilltopAds и т.п.) */
  code?: string;
  className?: string;
};

export function AdContainer({ slot, variant = "banner", code, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!code || !ref.current) return;
    const range = document.createRange();
    ref.current.innerHTML = "";
    ref.current.appendChild(range.createContextualFragment(code));
  }, [code]);
  if (!ENABLE_ADS) return null;
  const size =
    variant === "banner"
      ? "h-[50px] w-full max-w-[320px] md:h-[90px] md:max-w-[728px]"
      : variant === "card"
        ? "h-full min-h-[200px] w-full"
        : "h-[120px] w-full";
  return (
    <div data-ad-slot={slot} className={`relative mx-auto ${size} ${className}`}>
      <div ref={ref} className="grid h-full w-full place-items-center rounded-2xl border border-dashed bg-muted text-xs text-muted-foreground">
        {!code && <span>Рекламное место · {slot}</span>}
      </div>
      <span className="absolute left-2 top-2 rounded bg-background/80 px-1.5 text-[10px] font-medium text-muted-foreground">Реклама</span>
    </div>
  );
}

export function StickyAd() {
  const [open, setOpen] = useState(true);
  if (!ENABLE_ADS || !open) return null;
  return (
    <div className="fixed inset-x-0 bottom-16 z-40 flex justify-center px-2 md:hidden">
      <div className="relative w-full max-w-[320px] rounded-2xl bg-background shadow-card">
        <AdContainer slot="sticky-bottom" />
        <button onClick={() => setOpen(false)} aria-label="Закрыть рекламу" className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-foreground text-background">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
