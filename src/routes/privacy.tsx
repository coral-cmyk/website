import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SOCIAL } from "@/lib/projects";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Coco Atelier" },
      {
        name: "description",
        content:
          "How Coco Atelier handles contact details, accessibility preferences and website hosting, including rights under Israeli privacy law.",
      },
      { property: "og:title", content: "Privacy Policy — Coco Atelier" },
      {
        property: "og:description",
        content: "Privacy information for visitors and people contacting Coral Mesika.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPolicy,
});

const section = "mt-12 space-y-4";
const heading = "display pt-2 text-2xl md:text-3xl";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <main className="page-enter px-6 pb-32 pt-36 md:px-12">
      <p className="eyebrow text-muted-foreground">Privacy · פרטיות</p>
      <h1 className="serif-display mt-6 text-5xl md:text-7xl">Privacy policy</h1>
      <p className="mt-6 text-muted-foreground">Last updated: November 2026</p>

      <div className="mt-12 max-w-2xl text-base leading-relaxed md:text-lg">
        <p>
          This policy explains what information Coco Atelier receives when you visit this website
          or contact Coral Mesika, why it is used, and the choices and rights you have. It is
          written for the website as it operates today: there are no user accounts, contact forms,
          online payments or marketing mailing lists.
        </p>

        <section className={section} aria-labelledby="privacy-controller">
          <h2 id="privacy-controller" className={heading}>Who is responsible for your information</h2>
          <p>
            Coco Atelier — Coral Mesika is responsible for the personal information received through
            enquiries. For a privacy question or to exercise your rights, contact Coral by WhatsApp
            at <a className="link-line" href={SOCIAL.whatsapp} target="_blank" rel="noreferrer">+972 54 264 5228</a>.
          </p>
        </section>

        <section className={section} aria-labelledby="privacy-enquiries">
          <h2 id="privacy-enquiries" className={heading}>When you call or message</h2>
          <p>
            When you choose to call or contact Coco Atelier through WhatsApp or Instagram, Coral
            receives the details you choose to share. These may include your name, telephone number,
            profile details made available by the service, your message and information about your
            project.
          </p>
          <p>
            You are not legally required to provide these details; providing them is voluntary and
            depends on your choice. If you do not provide a way to reach you, Coral cannot answer
            your enquiry.
          </p>
        </section>

        <section className={section} aria-labelledby="privacy-use">
          <h2 id="privacy-use" className={heading}>How enquiry information is used</h2>
          <p>
            Enquiry information is used only to answer you, discuss and assess your potential
            project, arrange related communication, keep a record of the correspondence, and meet
            applicable legal obligations. Contact details are not used for marketing messages or
            promotional mailing lists.
          </p>
        </section>

        <section className={section} aria-labelledby="privacy-sharing">
          <h2 id="privacy-sharing" className={heading}>Who receives information</h2>
          <p>
            Coco Atelier does not sell or rent personal information. When you choose WhatsApp,
            Instagram or a telephone call, the relevant communications provider processes the
            information needed to provide that service. Service providers that host and operate this
            website may also process technical information needed to run it. Information may be
            disclosed where required by law, or where necessary to establish, exercise or defend
            legal rights.
          </p>
          <p>
            These providers may process information outside Israel under their own privacy terms.
          </p>
        </section>

        <section className={section} aria-labelledby="privacy-analytics">
          <h2 id="privacy-analytics" className={heading}>Website hosting and analytics</h2>
          <p>
            This website does not use visitor analytics or tracking tools. It is hosted by GitHub
            Pages. To deliver each page, GitHub receives the technical information that every
            browser sends, such as your IP address, browser type and the page requested, and may
            keep it in server logs for security purposes. <a className="link-line" href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noreferrer">GitHub&apos;s privacy statement</a> explains how it handles this information.
          </p>
        </section>

        <section className={section} aria-labelledby="privacy-storage">
          <h2 id="privacy-storage" className={heading}>Accessibility settings and cookies</h2>
          <p>
            This website does not use advertising cookies. The accessibility menu saves your choices
            in your browser&apos;s local storage so they remain active on your next visit. Those
            preferences stay on your device and are not sent to Coral. You can reset them in the
            accessibility menu or clear them through your browser settings.
          </p>
        </section>

        <section className={section} aria-labelledby="privacy-external">
          <h2 id="privacy-external" className={heading}>External content and links</h2>
          <p>
            The website loads fonts from Google Fonts and some project photographs from Wix image
            servers. Those providers receive the technical request needed to deliver the file, which
            can include your IP address and browser information, under their own privacy policies.
          </p>
          <p>
            Links to WhatsApp, Instagram, press articles and other external websites take you to
            services with their own privacy practices. Their handling of information is governed by
            their own policies.
          </p>
        </section>

        <section className={section} aria-labelledby="privacy-retention">
          <h2 id="privacy-retention" className={heading}>How long correspondence is kept</h2>
          <p>
            Correspondence is kept only as long as reasonably needed to handle an enquiry and any
            resulting work, and afterwards where required to meet legal obligations or establish,
            exercise or defend legal rights. Information that is no longer needed is deleted or
            anonymised.
          </p>
        </section>

        <section className={section} aria-labelledby="privacy-rights">
          <h2 id="privacy-rights" className={heading}>Your rights</h2>
          <p>
            Under sections 13 and 14 of Israel&apos;s Privacy Protection Law, 5741-1981, you have the
            right to review personal information held about you and to request correction of
            information that is incorrect, incomplete, unclear or not up to date. You may also
            contact Coral with a deletion request, which will be handled in accordance with
            applicable law.
          </p>
          <p>
            To exercise these rights, contact Coral through the WhatsApp number above. You may be
            asked to provide enough information to confirm that the request concerns you.
          </p>
        </section>

        <section className={section} aria-labelledby="privacy-security">
          <h2 id="privacy-security" className={heading}>Security and changes</h2>
          <p>
            Reasonable steps are taken to protect information, but no website or communication
            service can guarantee absolute security. This policy may be updated when the website or
            its information practices change; the date at the top shows the latest revision.
          </p>
        </section>
      </div>

      <div dir="rtl" lang="he" className="mt-20 max-w-2xl border-t pt-10 text-base leading-relaxed md:text-lg">
        <h2 className="serif-display text-4xl md:text-5xl">מדיניות פרטיות</h2>
        <p className="mt-4 text-muted-foreground">עודכן לאחרונה: נובמבר 2026</p>
        <p className="mt-8">
          מדיניות זו מסבירה איזה מידע מגיע ל־Coco Atelier בעת גלישה באתר או יצירת קשר עם קורל
          מסיקה, למה הוא משמש, ומהן הבחירות והזכויות העומדות לך. המדיניות מתייחסת לאתר כפי שהוא
          פועל כיום: אין בו חשבונות משתמש, טפסי יצירת קשר, תשלומים מקוונים או רשימות דיוור שיווקי.
        </p>

        <section className={section} aria-labelledby="he-privacy-controller">
          <h3 id="he-privacy-controller" className={heading}>בעלת השליטה במידע ודרכי יצירת קשר</h3>
          <p>
            Coco Atelier — קורל מסיקה היא האחראית למידע האישי המתקבל בפניות. לשאלה בנושא פרטיות
            או למימוש זכויות, ניתן לפנות לקורל בוואטסאפ שמספרו <a className="link-line" href={SOCIAL.whatsapp} target="_blank" rel="noreferrer"><span dir="ltr">+972 54 264 5228</span></a>.
          </p>
        </section>

        <section className={section} aria-labelledby="he-privacy-enquiries">
          <h3 id="he-privacy-enquiries" className={heading}>יצירת קשר בטלפון או בהודעה</h3>
          <p>
            אם בחרת להתקשר או לפנות ל־Coco Atelier בוואטסאפ או באינסטגרם, קורל מקבלת את הפרטים
            שבחרת למסור. אלה עשויים לכלול שם, מספר טלפון, פרטי פרופיל שהשירות מציג, תוכן ההודעה
            ומידע על הפרויקט.
          </p>
          <p>
            אין חובה חוקית למסור פרטים אלה; המסירה היא מרצון ותלויה בבחירתך. ללא פרטי התקשרות,
            קורל לא תוכל לחזור אליך בעקבות הפנייה.
          </p>
        </section>

        <section className={section} aria-labelledby="he-privacy-use">
          <h3 id="he-privacy-use" className={heading}>מטרות השימוש במידע</h3>
          <p>
            המידע מהפניות משמש רק כדי לענות לפנייה, לדון בפרויקט אפשרי ולבחון אותו, לתאם התקשרות
            בנוגע אליו, לנהל תיעוד של ההתכתבות ולעמוד בחובות המוטלות על פי דין. פרטי ההתקשרות אינם
            משמשים להודעות שיווקיות או לרשימות דיוור פרסומי.
          </p>
        </section>

        <section className={section} aria-labelledby="he-privacy-sharing">
          <h3 id="he-privacy-sharing" className={heading}>מסירת מידע לגורמים אחרים</h3>
          <p>
            Coco Atelier אינה מוכרת או משכירה מידע אישי. כאשר בוחרים בוואטסאפ, באינסטגרם או בשיחת
            טלפון, ספק התקשורת הרלוונטי מעבד את המידע הדרוש למתן השירות. ספקים המארחים ומפעילים את
            האתר עשויים גם הם לעבד מידע טכני הדרוש להפעלתו. מידע עשוי להימסר כאשר הדבר נדרש על פי
            דין, או כאשר הוא נחוץ לצורך ייסוד, מימוש או הגנה על זכויות משפטיות.
          </p>
          <p>ספקים אלה עשויים לעבד מידע מחוץ לישראל בהתאם לתנאי הפרטיות שלהם.</p>
        </section>

        <section className={section} aria-labelledby="he-privacy-analytics">
          <h3 id="he-privacy-analytics" className={heading}>אחסון האתר וסטטיסטיקת שימוש</h3>
          <p>
            האתר אינו משתמש בכלי סטטיסטיקה או מעקב אחר מבקרים. האתר מתארח ב־GitHub Pages. כדי
            להציג כל דף, GitHub מקבלת את המידע הטכני שכל דפדפן שולח, כגון כתובת IP, סוג הדפדפן
            והדף המבוקש, ועשויה לשמור אותו ביומני שרת לצורכי אבטחה. <a className="link-line" href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noreferrer">הצהרת הפרטיות של GitHub</a> מסבירה כיצד היא מטפלת במידע זה.
          </p>
        </section>

        <section className={section} aria-labelledby="he-privacy-storage">
          <h3 id="he-privacy-storage" className={heading}>העדפות נגישות ועוגיות</h3>
          <p>
            האתר אינו משתמש בעוגיות פרסום. תפריט הנגישות שומר את ההעדפות שנבחרו בזיכרון המקומי של
            הדפדפן כדי שיישארו פעילים בביקור הבא. העדפות אלה נשארות במכשיר ואינן נשלחות לקורל.
            ניתן לאפס אותן בתפריט הנגישות או למחוק אותן דרך הגדרות הדפדפן.
          </p>
        </section>

        <section className={section} aria-labelledby="he-privacy-external">
          <h3 id="he-privacy-external" className={heading}>תוכן וקישורים חיצוניים</h3>
          <p>
            האתר טוען גופנים מ־Google Fonts וחלק מתמונות הפרויקטים משרתי התמונות של Wix. ספקים אלה
            מקבלים את הבקשה הטכנית הדרושה להעברת הקובץ, שעשויה לכלול כתובת IP ופרטי דפדפן, בהתאם
            למדיניות הפרטיות שלהם.
          </p>
          <p>
            קישורים לוואטסאפ, לאינסטגרם, לכתבות ולאתרים חיצוניים אחרים מעבירים לשירותים בעלי
            מדיניות פרטיות משלהם. הטיפול במידע בהם כפוף למדיניות של אותם שירותים.
          </p>
        </section>

        <section className={section} aria-labelledby="he-privacy-retention">
          <h3 id="he-privacy-retention" className={heading}>משך שמירת ההתכתבות</h3>
          <p>
            ההתכתבות נשמרת רק כל עוד הדבר נדרש באופן סביר לטיפול בפנייה ובעבודה הנובעת ממנה, ולאחר
            מכן כאשר השמירה נדרשת לעמידה בחובות על פי דין או לייסוד, מימוש או הגנה על זכויות
            משפטיות. מידע שאין בו צורך נמחק או עובר אנונימיזציה.
          </p>
        </section>

        <section className={section} aria-labelledby="he-privacy-rights">
          <h3 id="he-privacy-rights" className={heading}>זכויות עיון ותיקון</h3>
          <p>
            על פי סעיפים 13 ו־14 לחוק הגנת הפרטיות, התשמ״א־1981, עומדת לך זכות לעיין במידע האישי
            המוחזק אודותיך ולבקש תיקון של מידע שאינו נכון, שלם, ברור או מעודכן. ניתן גם לפנות
            לקורל בבקשת מחיקה, שתטופל בהתאם לדין החל.
          </p>
          <p>
            למימוש זכויות אלה יש לפנות לקורל במספר הוואטסאפ המצוין לעיל. ייתכן שיהיה צורך למסור
            מידע מספיק כדי לוודא שהבקשה מתייחסת אליך.
          </p>
        </section>

        <section className={section} aria-labelledby="he-privacy-security">
          <h3 id="he-privacy-security" className={heading}>אבטחת מידע ושינויים במדיניות</h3>
          <p>
            ננקטים צעדים סבירים להגנה על המידע, אך אין אתר או שירות תקשורת שיכול להבטיח אבטחה
            מוחלטת. מדיניות זו עשויה להתעדכן כאשר האתר או אופן הטיפול במידע משתנים; התאריך שלמעלה
            מציין את העדכון האחרון.
          </p>
        </section>
      </div>
    </main>
  );
}
