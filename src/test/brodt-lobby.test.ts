import { describe, expect, it } from "vitest";

import { projects } from "@/lib/projects";

describe("Brodt Lobby", () => {
  const p = projects.find((x) => x.slug === "brodt-lobby")!;

  it("shows the lobby photo as its cover", () => {
    expect(p.cover).toContain("brodt-lobby-1");
    expect(p.images).toEqual([p.cover]);
  });

  it("reads Lobby, Tel Aviv, Israel under the name", () => {
    expect(p.category).toBe("Lobby");
    expect(p.location).toBe("Tel Aviv, Israel");
  });

  it("shows the size Coral gave", () => {
    expect(p.size).toBe("150 m²");
  });

  it("carries Coral's description of the center", () => {
    expect(p.text).toHaveLength(4);
    expect(p.text[0]).toContain("the Brodt Jewish Center is a vibrant hub");
    expect(p.text[1]).toContain("A custom-designed bar, bespoke wall cladding");
    expect(p.text[2]).toContain("The adjoining auditorium was also renovated");
    expect(p.text[3]).toContain("honors the center's community spirit");
  });
});
