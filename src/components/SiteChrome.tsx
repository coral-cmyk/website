import { Link, useLocation } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { WhatsAppLogo } from "@/components/WhatsAppLogo";
import { SOCIAL, projects } from "@/lib/projects";
import { posts } from "@/lib/journal";
import { ContactButtons, PHONE } from "@/components/ContactButtons";
import logoBone from "@/assets/coco-atelier-bone.png.asset.json";
import logoInk from "@/assets/coco-atelier-ink.png.asset.json";

export function Header() {
  // The logo follows whatever sits behind it: a bright photo top or a cream page
  // takes the dark logo; a dark photo top takes the light one on a shaded strip.
  const { pathname } = useLocation();
  const photoTop = pathname === "/" || pathname.startsWith("/work/");
  const slug = pathname.startsWith("/work/") ? pathname.split("/")[2] : undefined;
  const lightTop =
    pathname === "/"
      ? projects[0]?.lightTop
      : (projects.find((p) => p.slug === slug)?.lightTop ?? true);
  const shaded = photoTop && !lightTop;

  return (
    <header className={`absolute inset-x-0 top-0 z-50 ${shaded ? "text-bone" : "text-ink"}`}>
      {shaded && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/85 via-ink/45 to-transparent" />
      )}
      <div className="relative flex flex-nowrap items-center gap-x-3 px-4 py-5 sm:px-6 sm:py-6 md:gap-x-6 md:px-12">
        {/* The left edge carries the identity and the ways to reach Coral: the logo
            on inner pages (the landing page shows the big logo in its own screen),
            then the two buttons — plain icons on a phone, named on a computer. */}
        <div className="flex shrink-0 items-center gap-3 md:gap-8">
          {pathname !== "/" && (
            <Link to="/" aria-label="Coco Atelier — home" className="block shrink-0">
              <img
                src={shaded ? logoBone.url : logoInk.url}
                alt="Coco Atelier"
                className="h-[21px] w-auto sm:h-[25.2px] md:h-[29.4px]"
              />
            </Link>
          )}
          <ContactButtons className="hidden sm:flex" />
          <div className="flex items-center gap-2 sm:hidden">
            <a href={PHONE} aria-label="Call Coral Mesika" className="opacity-80 transition-opacity hover:opacity-100">
              <Phone size={17} strokeWidth={1.4} aria-hidden="true" />
            </a>
            <a
              href={SOCIAL.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with Coral Mesika on WhatsApp"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <WhatsAppLogo size={20} />
            </a>
          </div>
        </div>
        {/* The menu sits at the right edge, on the same line when it fits. */}
        <nav className="ml-auto flex shrink-0 flex-nowrap gap-2 whitespace-nowrap text-[0.5rem] font-medium uppercase tracking-[0.12em] sm:gap-3 sm:text-[0.6rem] sm:tracking-[0.18em] md:gap-8 md:text-[0.7rem] md:tracking-[0.32em]">
          <Link to="/projects" className="link-line">Projects</Link>
          <Link to="/studio" className="link-line">Studio</Link>
          <Link to="/press" className="link-line">Press</Link>
          <Link to="/contact" className="link-line">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="text-ink">
      <div className="flex justify-center px-6 pb-10 pt-4 md:px-12"><ContactButtons /></div>
      <div className="mx-6 flex flex-col items-start justify-between gap-6 border-t border-ink/15 pt-8 pb-28 eyebrow md:mx-12 md:flex-row md:items-center">
        <span className="text-ink/60">© {new Date().getFullYear()} Coco Atelier</span>
        <span className="hidden text-ink/60 md:inline">Interior Design by Coral Mesika — Tel Aviv / International</span>
        <div className="flex flex-wrap gap-x-6 gap-y-3 md:gap-8">
          {/* The Journal lives in the footer, and appears once a post is published. */}
          {posts.length > 0 && (
            <Link to="/journal" className="link-line">
              Journal
            </Link>
          )}
          <Link to="/privacy" resetScroll className="link-line">Privacy</Link>
          <Link to="/accessibility" className="link-line">Accessibility</Link>
          <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="link-line">Instagram</a>
          <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer" className="link-line">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
