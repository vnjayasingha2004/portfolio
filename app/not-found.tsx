import Link from "next/link";
import { KineticName } from "@/components/KineticName";

export default function NotFound() {
  return (
    <main id="main" className="not-found" data-theme="space">
      <KineticName lines={["404"]} className="nf-title" />
      <p>This page doesn&apos;t exist. It may have moved when the site was redesigned.</p>
      <Link href="/" className="text-link">
        Go to the homepage
      </Link>
    </main>
  );
}
