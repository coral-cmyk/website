import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

type Prefs = { text: number; contrast: boolean; gray: boolean; links: boolean; font: boolean; still: boolean; cursor: boolean };
const DEFAULT: Prefs = { text: 0, contrast: false, gray: false, links: false, font: false, still: false, cursor: false };
const KEY = "coco-a11y";

function apply(p: Prefs) {
  const c = document.documentElement.classList;
  [1, 2, 3].forEach((n) => c.toggle(`a11y-text-${n}`, p.text === n));
  (["contrast", "gray", "links", "font", "still", "cursor"] as const).forEach((k) => c.toggle(`a11y-${k}`, p[k]));
}

export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [p, setP] = useState<Prefs>(DEFAULT);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved) setP({ ...DEFAULT, ...saved });
    } catch {}
  }, []);
  useEffect(() => {
    apply(p);
    localStorage.setItem(KEY, JSON.stringify(p));
  }, [p]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopImmediatePropagation(); setOpen(false); } };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open]);

  const toggle = (k: keyof Omit<Prefs, "text">, label: string) => (
    <button type="button" aria-pressed={p[k]} onClick={() => setP({ ...p, [k]: !p[k] })}
      className={`w-full border px-4 py-3 text-left text-sm ${p[k] ? "bg-ink text-bone" : "bg-bone text-ink"}`}>
      {label}
    </button>
  );

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end">
      {open && (
        <div role="dialog" aria-label="Accessibility menu" className="mb-3 w-72 max-w-[calc(100vw-2.5rem)] border border-ink/20 bg-bone p-4 text-ink shadow-xl">
          <p className="eyebrow mb-3">Accessibility · נגישות</p>
          <div className="mb-2 flex items-center gap-2">
            <button type="button" onClick={() => setP({ ...p, text: Math.max(0, p.text - 1) })} className="flex-1 border px-3 py-3 text-sm" aria-label="Smaller text">A−</button>
            <button type="button" onClick={() => setP({ ...p, text: Math.min(3, p.text + 1) })} className="flex-1 border px-3 py-3 text-lg" aria-label="Larger text">A+</button>
          </div>
          <div className="space-y-2">
            {toggle("contrast", "High contrast")}
            {toggle("gray", "Grayscale")}
            {toggle("links", "Highlight links")}
            {toggle("font", "Readable font")}
            {toggle("still", "Stop animations")}
            {toggle("cursor", "Large cursor")}
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <button type="button" onClick={() => setP(DEFAULT)} className="link-line">Reset</button>
            <Link to="/accessibility" onClick={() => setOpen(false)} className="link-line">Accessibility statement</Link>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Accessibility menu"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-bone shadow-lg">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><circle cx="12" cy="4" r="2"/><path d="M4 8h16v2h-5.5v4l2 7h-2.2L12 15l-2.3 6H7.5l2-7v-4H4z"/></svg>
      </button>
    </div>
  );
}
