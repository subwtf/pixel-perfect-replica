import { describe, expect, it } from "vitest";
import { apps, searchApps } from "@/lib/apps";
import verified from "@/data/verified-assets.json";

describe("Verified catalog downloads", () => {
  it.each(apps)("uses verified release assets for $name", (app) => {
    const release = verified[app.id as keyof typeof verified];
    expect(release).toBeDefined();
    expect(app.version).toBe(release.version);
    expect(app.updatedAt).toBe(release.date);
    expect(release.urls).toContain(app.downloadUrl);
    for (const asset of app.architectures) {
      expect(release.urls).toContain(asset.url);
    }
  });

  it("uses the real NewPipe APK rather than a fabricated universal filename", () => {
    expect(apps.find((app) => app.id === "newpipe")?.downloadUrl).toBe("https://github.com/TeamNewPipe/NewPipe/releases/download/v0.29.1/NewPipe_v0.29.1.apk");
  });

  it("links AntennaPod to its release page when that release contains no APK", () => {
    expect(apps.find((app) => app.id === "antennapod")?.downloadKind).toBe("release");
  });

  it("finds a project by name without case sensitivity or outer whitespace", () => {
    expect(searchApps("  NEWPIPE  ").map((app) => app.id)).toEqual(["newpipe"]);
  });
});