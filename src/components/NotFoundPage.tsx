import { Link } from "@tanstack/react-router";

// Shared by the root not-found boundary and the /404 route, which is
// pre-rendered and copied to 404.html for GitHub Pages.
export function NotFoundPage() {
  return (
    <main className="page-enter min-h-screen px-6 pb-40 pt-36 md:px-12">
      <p className="eyebrow text-muted-foreground">404 · הדף לא נמצא</p>
      <h1 className="serif-display mt-6 leading-[0.95] text-[18vw] md:text-[11vw]">
        Page not
        <br />
        found.
      </h1>
      <p className="mt-12 max-w-xl text-lg text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-lg">
        <Link to="/projects/" className="link-line">
          See the projects
        </Link>
        <Link to="/" className="link-line">
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
