import { afterEach, describe, expect, it, vi } from "vitest";
import { getSavedTheme, initializeTheme, saveTheme } from "@/lib/theme";

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});

describe("Theme", () => {
  it("restores a saved dark theme", () => {
    localStorage.setItem("theme", "dark");
    initializeTheme();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
  it("respects saved light theme over a dark system preference", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as MediaQueryList);
    localStorage.setItem("theme", "light");
    initializeTheme();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
  it("uses the system preference without a saved theme", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as MediaQueryList);
    initializeTheme();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
  it("persists an explicitly selected theme", () => {
    saveTheme(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });
  it("still switches themes when browser storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
    expect(getSavedTheme()).toBeNull();
    expect(() => saveTheme(true)).not.toThrow();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});