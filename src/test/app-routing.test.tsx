import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each(["/apps", "/categories", "/popular", "/updates", "/about", "/app/newpipe"])("matches %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("ignores an unknown category rather than showing an empty catalog", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const match = router.matchRoutes("/apps", { cat: "invalid" }).at(-1);
    expect(match?.search).toEqual({ cat: undefined });
  });

  it("preserves the games category", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/apps", { cat: "games" }).at(-1)?.search).toEqual({ cat: "games" });
  });
});
