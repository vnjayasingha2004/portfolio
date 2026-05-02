import Link from "next/link";
import { InteractiveBackground } from "@/components/InteractiveBackground";

export default function NotFound() {
  return (
    <>
      <InteractiveBackground />
      <main className="not-found-page">
        <p className="section-kicker">404</p>
        <h1>Project route not found.</h1>
        <Link className="quiet-link light" href="/projects">
          Back to projects
        </Link>
      </main>
    </>
  );
}
