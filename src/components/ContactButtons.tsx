import { SOCIAL } from "@/lib/projects";

export const PHONE = "tel:+972542645228";

// Call + WhatsApp, shown at the top and bottom of every page.
export function ContactButtons({ className = "" }: { className?: string }) {
  const base =
    "inline-flex items-center justify-center border border-current px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-60 md:px-4 md:text-[0.65rem] md:tracking-[0.28em]";
  return (
    <div className={`flex gap-2 ${className}`}>
      <a href={PHONE} className={base}>Contact me</a>
      <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer" className={base}>WhatsApp</a>
    </div>
  );
}
