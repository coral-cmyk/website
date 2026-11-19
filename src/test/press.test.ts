import { describe, expect, it } from "vitest";

import { PRESS } from "@/lib/press";

describe("Press list", () => {
  it("carries every site Coral added", () => {
    expect(PRESS.map((p) => p.url)).toEqual([
      "https://www.prtfl.co.il/archives/161020",
      "https://competition.adesignaward.com/design.php?ID=99479",
      "https://bestdesignisrael.com/?ID=99479",
      "https://homeadore.com/2021-09-07/dup20-by-coral-mesika/",
      "https://www.design-interviews.com/design.php?ID=99479",
    ]);
  });

  it("gives every entry a publication, a title and a working link", () => {
    for (const p of PRESS) {
      expect(p.publication.length).toBeGreaterThan(0);
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.url.startsWith("https://")).toBe(true);
    }
  });
});
