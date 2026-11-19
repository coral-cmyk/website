import { createFileRoute } from "@tanstack/react-router";
import { SOCIAL } from "@/lib/projects";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Statement — Coco Atelier" },
      { name: "description", content: "Accessibility statement for the Coco Atelier website, per Israeli Standard IS 5568." },
      { property: "og:title", content: "Accessibility Statement — Coco Atelier" },
      { property: "og:description", content: "How the Coco Atelier website is made accessible." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Statement,
});

function Statement() {
  return (
    <main className="page-enter px-6 pb-32 pt-36 md:px-12">
      <p className="eyebrow text-muted-foreground">Accessibility</p>
      <h1 className="display mt-6 text-5xl md:text-7xl">Accessibility statement</h1>
      <div className="mt-12 max-w-2xl space-y-5 text-lg leading-relaxed">
        <p>Coco Atelier is committed to making this website usable for everyone, including people with disabilities, in line with the Israeli Equal Rights for Persons with Disabilities Regulations (2013) and Israeli Standard IS 5568, based on WCAG 2.0 level AA.</p>
        <h2 className="display pt-4 text-3xl">What we've done</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>An accessibility menu (the round button at the bottom-left of every page): larger text, high contrast, grayscale, highlighted links, a readable font, stopped animations and a large cursor.</li>
          <li>Full keyboard navigation with a visible focus outline; Escape closes the menu and returns from a project to the Projects page.</li>
          <li>Text descriptions on images, a clear page structure, and a layout that works on phones.</li>
        </ul>
        <h2 className="display pt-4 text-3xl">Accessibility contact</h2>
        <p>If something on the site is hard to use, please tell us and we'll fix it.<br />
          Coral Mesika — WhatsApp <a className="link-line" href={SOCIAL.whatsapp} target="_blank" rel="noreferrer">+972 54 264 5228</a></p>
        <p className="text-muted-foreground">Last updated: November 2026</p>
      </div>
      <div dir="rtl" lang="he" className="mt-20 max-w-2xl space-y-4 border-t pt-10 text-lg leading-relaxed">
        <h2 className="display text-3xl">הצהרת נגישות</h2>
        <p>Coco Atelier פועלת להנגשת האתר לכלל המשתמשים, לרבות אנשים עם מוגבלות, בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, ולתקן הישראלי ת"י 5568 ברמה AA.</p>
        <p>באתר תפריט נגישות (הכפתור העגול בפינה השמאלית התחתונה) הכולל הגדלת טקסט, ניגודיות גבוהה, גווני אפור, הדגשת קישורים, גופן קריא, עצירת אנימציות וסמן גדול. ניתן לנווט באתר באמצעות המקלדת.</p>
        <p>רכזת נגישות: קורל מסיקה — וואטסאפ <a className="link-line" href={SOCIAL.whatsapp} target="_blank" rel="noreferrer"><span dir="ltr">054-264-5228</span></a></p>
        <p className="text-muted-foreground">עודכן לאחרונה: נובמבר 2026</p>
      </div>
    </main>
  );
}
