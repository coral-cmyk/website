import { QueryClient } from "@tanstack/react-query";
import { RouterProvider, createMemoryHistory, createRouter } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Coral's rule for the top bar on a phone: the two ways to reach her sit on the
// left edge, the menu on the right — so in the bar the call and chat links must
// come before the menu, never after it.
async function renderHome() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] }),
    context: { queryClient: new QueryClient() },
  });
  await router.load();
  render(<RouterProvider router={router} />);
}

describe("Top bar order", () => {
  it("puts the call and WhatsApp links before the menu", async () => {
    await renderHome();

    const header = document.querySelector("header")!;
    const call = screen.getByRole("link", { name: "Call Coral Mesika" });
    const chat = screen.getByRole("link", { name: "Chat with Coral Mesika on WhatsApp" });
    const nav = header.querySelector("nav")!;

    expect(header.contains(call)).toBe(true);
    expect(header.contains(chat)).toBe(true);
    expect(call.compareDocumentPosition(nav) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(chat.compareDocumentPosition(nav) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
