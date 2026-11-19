import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { projects, sharePath, STUDIO_PORTRAIT } from "@/lib/projects";

// Every cover needs a small copy for link previews. If this fails, run:
//   sh scripts/make-share-images.sh <cover path>
describe("link preview images", () => {
  const covers = [...projects.filter((p) => p.cover).map((p) => p.cover!), STUDIO_PORTRAIT];

  it.each(covers)("%s has a share copy under 600 KB", (cover) => {
    const file = join(process.cwd(), "public", sharePath(cover));
    expect(existsSync(file), `missing ${file}`).toBe(true);
    expect(statSync(file).size).toBeLessThan(600_000);
  });
});
