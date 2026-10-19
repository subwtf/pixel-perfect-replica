import { Link } from "@tanstack/react-router";

export function LogoIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`logo-icon text-primary ${className}`} aria-hidden>
      <line className="antenna" x1="16" y1="13" x2="12" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line className="antenna" x1="32" y1="13" x2="36" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M8 26a16 14 0 0 1 32 0z" fill="currentColor" />
      <circle className="eye" cx="17" cy="20" r="2" fill="var(--background)" />
      <circle className="eye" cx="31" cy="20" r="2" fill="var(--background)" />
      <rect x="8" y="28" width="32" height="14" rx="4" fill="currentColor" opacity="0.18" />
      <path d="M15 35h18M24 35v0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle className="node" cx="15" cy="35" r="2.6" fill="currentColor" />
      <circle className="node" cx="24" cy="35" r="2.6" fill="currentColor" />
      <circle className="node" cx="33" cy="35" r="2.6" fill="currentColor" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="logo-link flex items-center gap-2">
      <LogoIcon />
      <span className="font-display text-xl font-extrabold tracking-tight">GitAPK</span>
      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">FOSS</span>
    </Link>
  );
}
