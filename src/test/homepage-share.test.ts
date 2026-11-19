import { describe, expect, it } from "vitest";

import { Route } from "@/routes/index";

// The line people see under the web address when the site is sent on WhatsApp
// comes from this page's share text, so it must say exactly what Coral asked for.
async function shareMeta() {
  const head = await Route.options.head?.({} as never);
  const meta = (head?.meta ?? []) as Array<Record<string, string | undefined>>;
  const find = (key: string) =>
    meta.find((m) => m["property"] === key || m["name"] === key)?.["content"];
  return { title: find("og:title"), description: find("og:description") };
}

describe("Homepage share text (link preview)", () => {
  it("shows Coco Atelier as the bold first line", async () => {
    expect((await shareMeta()).title).toBe("Coco Atelier");
  });

  it("shows Interior Design by Coral Mesika as the second line", async () => {
    expect((await shareMeta()).description).toBe("Interior Design by Coral Mesika");
  });
});
