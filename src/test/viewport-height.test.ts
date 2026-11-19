import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/styles.css", "utf8");

function utilityBlock(name: string) {
  const match = css.match(new RegExp(`@utility ${name}\\s*\\{([^}]*)\\}`));
  if (!match) throw new Error(`Missing @utility ${name}`);
  return match[1];
}

describe("Phone opening screens", () => {
  it.each([
    ["screen-height", "100svh"],
    ["cover-height", "92svh"],
  ])("keeps %s steady when the phone address bar hides", (name, stableHeight) => {
    const block = utilityBlock(name);
    expect(block).toContain(`height: ${stableHeight}`);
    expect(block).not.toContain("dvh");
  });
});
