import data from "@/data/apps.json";
import {
  Shield, Film, Music, MessageCircle, Terminal, Gamepad2, KeyRound, Wrench, type LucideIcon,
} from "lucide-react";

export type Release = { version: string; date: string; notes: string[]; url: string };
export type AppItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  icon: string;
  developer: string;
  githubUrl: string;
  version: string;
  size: string;
  license: string;
  shortDescription: string;
  fullDescriptionMarkdown: string;
  downloadUrl: string;
  architectures: { name: string; url: string }[];
  changelog: string;
  releases?: Release[];
  updatedAt: string;
  isTop: boolean;
};

export const apps = data as AppItem[];

export const categories: { id: string; name: string; short: string; icon: LucideIcon }[] = [
  { id: "vpn", name: "Сети, VPN & Прокси", short: "VPN & Сети", icon: Shield },
  { id: "media", name: "Медиа, Видео & Плееры", short: "Плееры", icon: Film },
  { id: "music", name: "Музыка & Аудио", short: "Музыка", icon: Music },
  { id: "messengers", name: "Общение & Мессенджеры", short: "Общение", icon: MessageCircle },
  { id: "system", name: "Системные утилиты & ADB", short: "Утилиты", icon: Terminal },
  { id: "games", name: "Игры & Эмуляторы", short: "Игры", icon: Gamepad2 },
  { id: "security", name: "Безопасность & Пароли", short: "Безопасность", icon: KeyRound },
  { id: "tools", name: "Инструменты & Продуктивность", short: "Инструменты", icon: Wrench },
];

export const getApp = (slug: string) => apps.find((a) => a.slug === slug);
export const byCategory = (cat?: string) => (cat ? apps.filter((a) => a.category === cat) : apps);
export const latest = () => [...apps].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
export const topApps = () => apps.filter((a) => a.isTop);

export function searchApps(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return apps.filter((a) =>
    [a.name, a.category, a.categoryName, a.developer, a.githubUrl, a.shortDescription]
      .join(" ")
      .toLowerCase()
      .includes(s),
  );
}
